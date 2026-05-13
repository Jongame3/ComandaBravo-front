import type { Appointment } from "../../data/adminType";
import { AppointmentList } from "./AppointmentList";

type PendingAppointmentsTabProps = {
  appointments: Appointment[];
  onConfirm?: (id: number) => void;
};

export function PendingAppointmentsTab({appointments, onConfirm}: PendingAppointmentsTabProps) {

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1b2b6b]">
            Подтверждение записей
          </h2>

          <p className="mt-2 text-slate-500">
            Здесь отображаются только записи со статусом “Ожидает”.
          </p>
        </div>

        <div className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1b2b6b] shadow-sm">
          Ожидают: {appointments.length}
        </div>
      </div>

      <AppointmentList
        appointments={appointments}
        variant="cards"
        showConfirmButton
        onConfirm={onConfirm}
        emptyText="Нет записей, ожидающих подтверждения."
      />
    </div>
  );
}