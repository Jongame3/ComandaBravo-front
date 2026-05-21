import { useMemo, useState } from "react";
import type { Appointment } from "../../data/adminType";
import { AppointmentList } from "./AppointmentList";

type AppointmentsTabProps = {
  appointments: Appointment[];
  onConfirm?: (id: number) => void;
  onDiscard?: (id: number) => void;
};

export function AppointmentsTab({ appointments, onConfirm , onDiscard}: AppointmentsTabProps) {
  const [search, setSearch] = useState("");

  
  const filteredAppointments = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return appointments;
    }

    return appointments.filter((appointment) => {
      const statusText = appointment.isApproved ? "подтверждена" : "ожидает";

      const target = [
        appointment.username,
        appointment.productInfo,
        appointment.petInfo,
        appointment.date,
        appointment.startTime.toString(),
        `${appointment.startTime}:00`,
        statusText,
      ]
        .join(" ")
        .toLowerCase();

      return target.includes(normalizedSearch);
    });
  }, [appointments, search]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1b2b6b]">
            Просмотр записей
          </h2>

          <p className="mt-2 text-slate-500">
            Здесь отображаются все записи клиентов: ожидающие и подтверждённые.
          </p>
        </div>

        <div className="w-full max-w-105">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по клиенту, питомцу или услуге"
            className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
          />
        </div>
      </div>

      <div className="mt-6">
        <AppointmentList
          appointments={filteredAppointments}
          variant="table"
          emptyText="Записи не найдены."
          showConfirmButton = {true}
          onConfirm={onConfirm}
          onDiscard={onDiscard}
        />
      </div>
    </div>
  );
}