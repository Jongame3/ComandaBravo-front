import { useAuth } from "../AuthContext";
import { replace, useNavigate } from "react-router-dom";

type AdminHeaderProps = {
  pendingCount: number;
  totalAppointments: number;
  onOpenProducts: () => void;
  onOpenPending: () => void;
};



export function AdminHeader({pendingCount,totalAppointments,}: AdminHeaderProps) {
  const {logout} = useAuth()
  const navigate = useNavigate()


  function handleLogout() {
    logout()

    setTimeout(() => {
      navigate("/", {replace : true});
    },0)
  }

  return (
    <div className="rounded-4xl bg-linear-to-r from-[#1765f3] to-[#18a0f4] px-6 py-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:px-10 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            Comanda Bravo • Admin Panel
          </div>

          <h1 className="max-w-175 text-4xl font-extrabold leading-tight md:text-5xl xl:text-6xl">
            Управление клиникой в одном месте
          </h1>

          <p className="mt-5 max-w-155 text-base leading-7 text-white/90 md:text-lg">
            Добавляйте услуги, подтверждайте записи клиентов и отслеживайте
            расписание в единой административной панели.
          </p>

          

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white">
              Услуги
            </span>
            <span className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white">
              Записи
            </span>
            <span className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white">
              Клиенты
            </span>
            <span className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white">
              Подтверждения
            </span>
          </div>
        </div>

        <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white px-5 py-5 text-[#1b2b6b] shadow-sm">
              <p className="text-sm font-medium text-slate-500">Ожидают</p>
              <p className="mt-3 text-3xl font-extrabold">{pendingCount}</p>
              <p className="mt-2 text-sm text-slate-500">
                Записи на подтверждение
              </p>
            </div>

            <div className="rounded-3xl bg-white px-5 py-5 text-[#1b2b6b] shadow-sm">
              <p className="text-sm font-medium text-slate-500">Всего записей</p>
              <p className="mt-3 text-3xl font-extrabold">
                {totalAppointments}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                В системе администратора
              </p>

            </div>
            <div className="rounded-3xl bg-white px-5 py-5 text-[#1b2b6b] shadow-sm">
              <p className="text-sm font-medium text-slate-500">Выйти из профиля ветеринара</p>
              <p className="mt-3 text-3xl font-extrabold">
               <button className = "bg-blue-800 w-30 rounded-full inline-flex items-center justify-center cursor-pointer px-3 py-2 text-sm text-white"
                            onClick={handleLogout}>Выйти</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}