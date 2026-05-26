import type { Appointment } from "../../data/adminType";
import { parsePetInfo } from "../../Functions/parsePetInfo";
import { formatDate } from "../../Functions/formatDate";

type AppointmentCardProps = {
  appointment: Appointment;
  showConfirmButton?: boolean;
  onConfirm?: (id: number) => void;
};

export function AppointmentCard({
  appointment,
  onConfirm,
}: AppointmentCardProps) {
  const { petName, healthProblems } = parsePetInfo(appointment.petInfo);

  return (
    <div className="rounded-[28px] bg-[#a8e2ba] p-5 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-black">
            {appointment.productInfo}
          </h3>

          <p className="mt-1 text-sm text-slate-700">{appointment.username}</p>
        </div>

        <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1b2b6b]">
          {appointment.isApproved ? "Подтверждена" : "Ожидает"}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/60 p-4">
          <p className="text-xs font-semibold text-slate-500">Дата и время</p>

          <p className="mt-1 font-bold text-[#1b2b6b]">
            {formatDate(appointment.date)}, {appointment.startTime}:00
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Информация о питомце
        </p>

        <p className="mt-1 text-lg font-extrabold text-[#1b2b6b]">{petName}</p>

        <div className="mt-3 rounded-2xl bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-600">
            Прошлые проблемы со здоровьем
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-700">
            {healthProblems}
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        {!appointment.isApproved && (
          <button
            type="button"
            onClick={() => onConfirm?.(appointment.id)}
            className="rounded-full bg-[#09da72] px-5 py-2 text-sm font-semibold text-black cursor-pointer"
          >
            Подтвердить
          </button>
        )}
      </div>
    </div>
  );
}
