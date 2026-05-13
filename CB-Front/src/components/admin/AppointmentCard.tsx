import type  { Appointment } from "../../data/adminType";

type AppointmentCardProps = {
  appointment: Appointment;
  showConfirmButton?: boolean;
  onConfirm?: (id: number) => void;
};

export function AppointmentCard({appointment,showConfirmButton = false,onConfirm,}: AppointmentCardProps) {
  const statusText = appointment.isApproved ? "Подтверждена" : "Ожидает";

  const statusStyles = appointment.isApproved
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";

  return (
    <div className="rounded-3xl bg-[#a8e2ba] p-5 shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-extrabold text-black">
            {appointment.productInfo}
          </h3>

          <p className="mt-2 text-slate-700">
            Клиент: {appointment.username}
          </p>

          <p className="text-slate-700">
            Питомец: {appointment.petInfo}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
        >
          {statusText}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-700">
        <p>Дата: {appointment.date}</p>
        <p>Время: {appointment.startTime}:00</p>
        <p>ID записи: #{appointment.id}</p>
        <p>ID пользователя: #{appointment.userId}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {showConfirmButton && !appointment.isApproved && onConfirm && (
          <button
            type="button"
            onClick={() => onConfirm(appointment.id)}
            className="rounded-full bg-[#09da72] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-95"
          >
            Подтвердить
          </button>
        )}
      </div>
    </div>
  );
}