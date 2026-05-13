import { useEffect, useState } from "react";
import type { Appointment } from "../data/adminType";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminTabs } from "../components/admin/AdminTabs";
import { AdminOverview } from "../components/admin/AdminOverview";
import { AddProductTab } from "../components/admin/AddProductTab";
import type { AdminTab } from "../data/adminType";
import { PendingAppointmentsTab } from "../components/admin/PendingAppointmentsTab";
import { AppointmentsTab } from "../components/admin/AppointmentsTab";
import { apiFetch } from "../Functions/apiFetch";
import Header from "../components/Header";



export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  async function loadAppointments() {
    try{
      setIsLoading(true);
      setError("");

      const response = await apiFetch("/appointment/All")

      if (!response.ok) {
        throw new Error("Не удалось загрузить записи")
      }
      const data : Appointment[] = await response.json();


      console.log("appointments from API:", data);
      setAppointments(data);
    } catch(error) {
      console.error("Ошибка загрузки записей:", error);
      setError("Vaflez");
    } finally {
      setIsLoading(false)
    }
  }
  useEffect (() => {
    loadAppointments();
  }, [])
  

  async function handleConfirm(id : number) {
    const response  = await apiFetch(`/appointment/approve?id=${id}` ,
      {
        method: "PUT"
      });
      if(!response.ok){
        alert("не удалось подтвердить запись");
        return;
      }
      const aprovedappointment = appointments.find((item) => item.id === id);
      if(aprovedappointment) {
        aprovedappointment.isApproved = true;
      }
  }


  const pendingAppointments = appointments.filter(
    (appointment) => appointment.isApproved === false
  );



  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-350">
          <div className="rounded-4xl bg-white p-10 text-center shadow">
            <p className="text-lg font-semibold text-[#1b2b6b]">
              Загрузка админ-панели...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-350">
          <div className="rounded-4xl bg-white p-10 text-center shadow">
            <p className="text-lg font-semibold text-red-600">{error}</p>

            <button
              type="button"
              onClick={loadAppointments}
              className="mt-5 rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <Header/>
    <section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-350">
        <AdminHeader
          pendingCount={pendingAppointments.length}
          totalAppointments={appointments.length}
          onOpenProducts={() => setActiveTab("products")}
          onOpenPending={() => setActiveTab("pending")}
        />

        <div className="mt-8 rounded-4xl bg-[#dfe1e6]/70 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.05)] md:p-6">
          <AdminTabs activeTab={activeTab} onChangeTab={setActiveTab} />

          {activeTab === "overview" && (
            <AdminOverview
              pendingCount={pendingAppointments.length}
              totalAppointments={appointments.length}
              onOpenProducts={() => setActiveTab("products")}
              onOpenPending={() => setActiveTab("pending")}
              onOpenAppointments={() => setActiveTab("appointments")}
            />
          )}

          {activeTab === "products" && <AddProductTab />}

          {activeTab === "pending" && (
            <PendingAppointmentsTab appointments={pendingAppointments} onConfirm={handleConfirm} />
          )}

          {activeTab === "appointments" && (
            <AppointmentsTab appointments={appointments} onConfirm={handleConfirm}/>
          )}
        </div>
      </div>
    </section>
    </>
  );
}