type AdminOverviewProps = {
  pendingCount: number;
  totalAppointments: number;
  onOpenProducts: () => void;
  onOpenPending: () => void;
  onOpenAppointments: () => void;
};

export function AdminOverview({pendingCount,totalAppointments,onOpenProducts,onOpenPending,onOpenAppointments,}: AdminOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] bg-[#a8e2ba] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-extrabold text-black">
            Быстрые действия
          </h2>

          <p className="mt-2 max-w-155 text-slate-700">
            Управляйте основными сценариями: добавляйте новые услуги,
            подтверждайте записи и просматривайте расписание.
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
          <h3 className="text-xl font-extrabold text-[#1b2b6b]">
            Состояние системы
          </h3>

          <div className="mt-5 grid gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-[#f5f7fb] px-4 py-3">
              <span className="text-sm text-slate-600">Записей ожидает</span>
              <span className="font-bold text-[#1b2b6b]">{pendingCount}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#f5f7fb] px-4 py-3">
              <span className="text-sm text-slate-600">Всего записей</span>
              <span className="font-bold text-[#1b2b6b]">
                {totalAppointments}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-4xl font-extrabold text-[#1b2b6b]">
          Основные разделы
        </h2>

        <div className="grid gap-5 lg:grid-cols-3">
          <OverviewCard
            title="Добавление продуктов"
            description="Создавайте новые услуги для каталога. На которые потом смогут записаться пользователи."
            buttonText="Добавить"
            onClick={onOpenProducts}
          />

          <OverviewCard
            title="Подтверждение записей"
            description="Обрабатывайте заявки, которые ожидают решения ветеринара."
            buttonText="Открыть заявки"
            onClick={onOpenPending}
          />

          <OverviewCard
            title="Просмотр записей"
            description="Следите за расписанием и статусами записей клиентов."
            buttonText="Смотреть"
            onClick={onOpenAppointments}
          />
        </div>
      </div>
    </div>
  );
}

type OverviewCardProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

function OverviewCard({
  title,
  description,
  buttonText,
  onClick,
}: OverviewCardProps) {
  return (
    <div className="rounded-3xl bg-[#a8e2ba] p-5 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
      <p className="text-lg font-extrabold text-black">{title}</p>
      <p className="mt-3 text-slate-700">{description}</p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black"
      >
        {buttonText}
      </button>
    </div>
  );
}