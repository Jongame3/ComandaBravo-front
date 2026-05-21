import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { apiFetch } from "../Functions/apiFetch";
import type { Appointment } from "../data/adminType";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

type Pet = {
  id : number;
  name: string;
  healthProblems: string;
  userID : number;
  type: number;
};

const PetTypeMap: Record<number, string> = {
  0: "Кошка",
  1: "Собака",
  2: "Попугай",
  3: "Хомяк",
  4: "Мышь",
  5: "Кролик",
  6: "Морская свинка",
};


export default function UserProfilePage() {
    const {logout} = useAuth()
    const navigate = useNavigate()
    
    function handleLogout() {
        logout()

        setTimeout(() => {
            navigate("/", {replace : true});
        },0)
    }
  const { user } = useAuth();

  const [appointments,setAppointments] = useState<Appointment[]>([]);
  const [pets,setPets] = useState<Pet[]>([]);

    function formatTime(startTime: number) {
        return `${startTime.toString().padStart(2, "0")}:00`;
    }

    function handleOpenAddPet() {
        console.log("Открыть добавление питомца");
    }

    async function loadAppointments() {
        const response = await apiFetch(`/appointment/GetByUserId?userid=${user?.id}`);
        if(!response.ok){
            throw new Error("Не удалось загрузить ваши записи");
        }
        const data : Appointment[] = await response.json();
        setAppointments(data);
    }
    async function loadPets() {
        const response = await apiFetch(`/pet/GetByUserId?userid=${user?.id}`);
        if(!response.ok){
            throw new Error("Не удалось загрузить питомцев");
        }
        const data : Pet[] = await response.json();
        setPets(data);
    }

    useEffect(() => {
        loadAppointments();
        loadPets();
    },[])
    async function handleAppointmentDiscard(id: number) {
        const response = await apiFetch(`/appointment?id=${id}`, {
            method: "DELETE",
        })
        if(!response.ok) {
            throw new Error("вафельки");
        }
        setAppointments((prev) => prev.filter((a) => a.id !== id));
    }

  return (
    <>
    <Header />
        <section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
          <div className="mx-auto max-w-350">
              <div className="rounded-4xl bg-linear-to-r from-[#1765f3] to-[#18a0f4] px-6 py-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:px-10 md:py-10">
                  <div className="max-w-190">
                      <div className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                          Comanda Bravo • Профиль пользователя
                      </div>
                      <h1 className="text-4xl font-extrabold leading-tight md:text-5xl xl:text-6xl">
                          Личный кабинет владельца питомца
                      </h1>
                      <p className="mt-5 max-w-155 text-base leading-7 text-white/90 md:text-lg">
                          Здесь можно просматривать свои записи, следить за статусом приёма
                          и управлять списком своих питомцев.
                      </p>
                  </div>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
                  <div className="space-y-6">
                      <div
                          id="appointments"
                          className="rounded-4xl bg-[#dfe1e6]/70 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.05)] md:p-6"
                      >
                          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                              <div>
                                  <h2 className="text-4xl font-extrabold text-[#1b2b6b]">
                                      Мои записи
                                  </h2>
                                  <p className="mt-2 text-slate-500">
                                      Здесь отображаются все ваши записи на услуги клиники.
                                  </p>
                              </div>
                              <div className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1b2b6b] shadow-sm">
                                  Всего: {appointments.length}
                              </div>
                          </div>

                          {appointments.length === 0 ? (
                              <div className="rounded-3xl bg-white p-10 text-center shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
                                  <p className="text-sm font-medium text-slate-500">
                                      У вас пока нет записей.
                                  </p>
                              </div>
                          ) : (
                              <div className="grid gap-5">
                                  {appointments.map((appointment) => {
                                      const statusText = appointment.isApproved
                                          ? "Подтверждена"
                                          : "Ожидает";

                                      const statusStyle = appointment.isApproved
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-amber-100 text-amber-700";

                                      return (
                                          <div
                                              key={appointment.id}
                                              className="rounded-3xl bg-[#a8e2ba] p-5 shadow-[0_10px_18px_rgba(0,0,0,0.05)]"
                                          >
                                              <div className="flex items-start justify-between gap-4">
                                                  <div>
                                                      <h3 className="text-2xl font-extrabold text-black">
                                                          {appointment.productInfo}
                                                      </h3>
                                                      <p className="mt-2 text-slate-700">
                                                          Питомец: {appointment.petInfo}
                                                      </p>
                                                  </div>
                                                  <span
                                                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                                                  >
                                                      {statusText}
                                                  </span>
                                              </div>

                                              <div className="mt-4 space-y-1 text-sm text-slate-700">
                                                  <p>Дата: {appointment.date}</p>
                                                  <p>Время: {formatTime(appointment.startTime)}</p>
                                              </div>
                                              <button onClick={() => handleAppointmentDiscard(appointment.id)} className="w-20 mt-3 bottom-3 right-3 bg-green-400 rounded-full hover:bg-green-200 inline-flex items-center justify-center cursor-pointer px-3 py-2 text-sm">Отменить</button>
                                          </div>
                                      );
                                  })}
                              </div>
                          )}
                      </div>

                      <div
                          id="pets"
                          className="rounded-4xl-[#dfe1e6]/70 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.05)] md:p-6"
                      >
                          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                              <div>
                                  <h2 className="text-4xl font-extrabold text-[#1b2b6b]">
                                      Мои питомцы
                                  </h2>
                                  <p className="mt-2 text-slate-500">
                                      Список питомцев, привязанных к вашему профилю.
                                  </p>
                              </div>

                              <button
                                  type="button"
                                  onClick={handleOpenAddPet}
                                  className="w-fit rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 cursor-pointer"
                              >
                                  Добавить нового
                              </button>
                          </div>

                          {pets.length === 0 ? (
                              <div className="rounded-3xl bg-white p-10 text-center shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
                                  <p className="text-sm font-medium text-slate-500">
                                      Питомцы пока не добавлены.
                                  </p>

                                  <button
                                      type="button"
                                      onClick={handleOpenAddPet}
                                      className="mt-5 rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 cursor-pointer"
                                  >
                                      Добавить первого питомца
                                  </button>
                              </div>
                          ) : (
                              <div className="grid gap-5 md:grid-cols-2">
                                  {pets.map((pet) => (
                                      <div
                                          key={pet.id}
                                          className="rounded-3xl bg-[#a8e2ba] p-5 shadow-[0_8px_16px_rgba(0,0,0,0.05)]"
                                      >
                                          <div className="flex items-start justify-between gap-4">
                                              <div>
                                                  <h3 className="text-2xl font-extrabold text-black">
                                                      {pet.name}
                                                  </h3>

                                                  <p className="mt-2 text-slate-700">
                                                      {PetTypeMap[pet.type] || "абоминация"}
                                                  </p>

                                                  <p className="text-slate-700">
                                                      Проблемы: {pet.healthProblems}
                                                  </p>
                                              </div>

                                              <button
                                                  type="button"
                                                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1b2b6b] transition hover:bg-slate-100 cursor-pointer"
                                              >
                                                  Изменить
                                              </button>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>
                  </div>

                  <aside className="rounded-4xl bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)] xl:sticky xl:top-8">
                      <div className="rounded-[28px] bg-linear-to-r from-[#1765f3] to-[#18a0f4] p-6 text-white">
                          <p className="text-sm font-semibold text-white/80">
                              Имя пользователя
                          </p>

                          <h2 className="mt-3 text-3xl font-extrabold">
                              {user?.username || "User"}
                          </h2>
                      </div>

                      <div className="mt-5 grid gap-4">
                          <div className="rounded-3xl bg-[#eef3ff] px-5 py-5 text-[#1b2b6b]">
                              <p className="text-sm font-medium text-slate-500">Моих записей</p>
                              <p className="mt-3 text-3xl font-extrabold">{appointments.length}</p>
                              <p className="mt-2 text-sm text-slate-500">Все записи</p>
                          </div>

                          <div className="rounded-3xl bg-[#eef3ff] px-5 py-5 text-[#1b2b6b]">
                              <p className="text-sm font-medium text-slate-500">Питомцев</p>
                              <p className="mt-3 text-3xl font-extrabold">{pets.length}</p>
                              <p className="mt-2 text-sm text-slate-500">Добавлены в профиль</p>
                          </div>
                        <div className="rounded-3xl bg-[#eef3ff] px-5 py-5 text-[#1b2b6b]">
                              <p className="text-sm font-medium text-slate-500">Выйти из профиля</p>
                              <button className = "mt-3 bg-blue-800 w-30 rounded-full inline-flex items-center justify-center cursor-pointer px-3 py-2 text-sm text-white"
                            onClick={handleLogout}>Выйти</button>
                          </div>
                      </div>
                  </aside>
              </div>
          </div>
      </section></>
  );
}