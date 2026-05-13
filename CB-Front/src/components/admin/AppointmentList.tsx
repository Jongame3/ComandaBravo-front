import type { Appointment } from "../../data/adminType";
import { AppointmentCard } from "./AppointmentCard";

type AppointmentListProps = {
  appointments: Appointment[];
  variant: "cards" | "table";
  emptyText: string;
  showConfirmButton?: boolean;
  onConfirm?: (id: number) => void;
};

function getStatusText(isApproved: boolean) {
  return isApproved ? "Подтверждена" : "Ожидает";
}

function getStatusStyles(isApproved: boolean) {
  return isApproved
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";
}

function formatTime(startTime: number) {
  return `${startTime.toString().padStart(2, "0")}:00`;
}

export function AppointmentList({appointments,variant,emptyText,showConfirmButton = false,onConfirm,}: AppointmentListProps) {
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
              <th className="px-5 py-4">Услуга</th>
              <th className="px-5 py-4">Дата</th>
              <th className="px-5 py-4">Время</th>
              <th className="px-5 py-4">Статус</th>
              <th className="px-5 py-4 text-right">Действия</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment, index) => {
              const statusText = getStatusText(appointment.isApproved);
              const statusStyles = getStatusStyles(appointment.isApproved);
              const formattedTime = formatTime(appointment.startTime);

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

                  <td className="px-5 py-4 text-slate-700">
                    {appointment.petInfo}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {appointment.productInfo}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {appointment.date}
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
                      {showConfirmButton && !appointment.isApproved && onConfirm && (
                          <button
                            type="button"
                            onClick={() => onConfirm(appointment.id)}
                            className="rounded-full bg-[#09da72] px-4 py-2 text-xs font-semibold text-black"
                          >
                            Подтвердить
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