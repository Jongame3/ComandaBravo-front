import type { Appointment } from "../../data/adminType";
import { formatDate } from "../../Functions/formatDate";
import { parsePetInfo } from "../../Functions/parsePetInfo";
import { AppointmentCard } from "./AppointmentCard";
import { isAfter } from "date-fns";

const PetTypeMap: Record<number, string> = {
  0: "Кошка",
  1: "Собака",
  2: "Попугай",
  3: "Хомяк",
  4: "Мышь",
  5: "Кролик",
  6: "Морская свинка",
};

type AppointmentListProps = {
  appointments: Appointment[];
  variant: "cards" | "table";
  emptyText: string;
  showConfirmButton?: boolean;
  onConfirm?: (id: number) => void;
  onDiscard?: (id: number) => void;
};

function getStatusText(isApproved: boolean, date: string, time : number) {
  const now = new Date()
  const appointmentTime = new Date(`${date}T${String(time).padStart(2, "0")}:00`);

  if(isApproved && isAfter(appointmentTime, now)) return "Подтверждена"
  if(isApproved && !isAfter(appointmentTime, now)) return "Проведена"
  if(!isApproved && !isAfter(appointmentTime, now)) return "Не состоялась"
  return "Ожидает"
}

function getStatusStyles(isApproved: boolean, date: string, time : number) {
  const now = new Date()
  const appointmentTime = new Date(`${date}T${String(time).padStart(2, "0")}:00`);

  if(isApproved && isAfter(appointmentTime, now)) return "bg-emerald-100 text-emerald-700"
  if(isApproved && !isAfter(appointmentTime, now)) return "bg-emerald-300 text-emerald-700"
  if(!isApproved && !isAfter(appointmentTime,now)) return "bg-red-400 text-black"
  return "bg-amber-100 text-amber-700";
}

function formatTime(startTime: number) {
  return `${startTime.toString().padStart(2, "0")}:00`;
}

function canConfirm(appointment : Appointment) {
  if (appointment.isApproved) return false

  const now = new Date()
  const appointmentTime = new Date(`${appointment.date}T${String(appointment.startTime).padStart(2, "0")}:00`);

  return isAfter(appointmentTime, now);

}



export function AppointmentList({appointments,variant,emptyText,showConfirmButton = false,onConfirm, onDiscard}: AppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
        <p className="text-sm font-medium text-slate-500">{emptyText}</p>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            showConfirmButton={showConfirmButton}
            onConfirm={onConfirm}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#eef3ff]">
            <tr className="text-left text-sm font-semibold text-[#1b2b6b]">
              <th className="px-5 py-4">Клиент</th>
              <th className="px-5 py-4">Питомец</th>
              <th className="px-5 py-4">Тип</th>
              <th className="px-5 py-4">Услуга</th>
              <th className="px-5 py-4">Дата</th>
              <th className="px-5 py-4">Время</th>
              <th className="px-5 py-4">Статус</th>
              <th className="px-5 py-4 text-right">Действия</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment, index) => {
              const statusText = getStatusText(appointment.isApproved, appointment.date, appointment.startTime);
              const statusStyles = getStatusStyles(appointment.isApproved, appointment.date, appointment.startTime);
              const formattedTime = formatTime(appointment.startTime);
              const { petName, healthProblems } = parsePetInfo(appointment.petInfo);

              return (
                <tr
                  key={appointment.id}
                  className={`text-sm ${
                    index !== appointments.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {appointment.username}
                  </td>

                  <td className="px-5 py-4">
                    <div className="max-w-65">
                      <p className="font-semibold text-slate-800 text-center">
                        {petName}
                      </p>

                      <div className="mt-2 rounded-2xl bg-red-50 px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-red-500">
                          Проблемы
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-700 wrap-break-word">
                          {healthProblems}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {PetTypeMap[appointment.petType]}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {appointment.productInfo}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {formatDate(appointment.date)}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {formattedTime}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
                    >
                      {statusText}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {showConfirmButton && canConfirm(appointment) && onConfirm && (
                          <button
                            type="button"
                            onClick={() => onConfirm(appointment.id)}
                            className="rounded-full bg-[#09da72] px-4 py-2 text-xs font-semibold text-black cursor-pointer"
                          >
                            Подтвердить
                          </button>
                        )}
                        {!canConfirm(appointment) && onDiscard &&(
                          <button
                            type="button"
                            onClick={() => onDiscard(appointment.id)}
                            className="rounded-full bg-red-300 px-4 py-2 text-xs font-semibold text-black cursor-pointer"
                          >
                            Удалить
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}