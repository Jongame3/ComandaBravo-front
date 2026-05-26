import { useState } from "react";
import { useAuth } from "../components/AuthContext"
import { apiFetch } from "../Functions/apiFetch"
import { type Pet, PetTypeMap } from "./UserProfile"
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastContext";



export function Petadd() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const {showToast} = useToast()
    const [pet, setPet] = useState<Pet>({
    id : 0,
    name: "",
    healthProblems: "",
    userID: user?.id || 0,
    type: 0,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setPet((prev) => ({
      ...prev,
      [name]: name === "type" ? parseInt(value, 10) : value,
      userID: user?.id || 0, 
    }));
  }


  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiFetch("/pet", {
        method: "POST",
        body: JSON.stringify(pet),
      });

      if (!response.ok) showToast("Не удалось добавить питомца","error");

      showToast("Питомец успешно добавлен!", "success");
      setPet({ id: 0, name: "", healthProblems: "", userID: user?.id || 0, type: 0 });
      navigate("/profile")
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Ошибка при добавлении питомца", "info");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
        <Header />
          <section className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-xl rounded-[28px] bg-white p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
            <h1 className="text-3xl font-extrabold text-[#1b2b6b]">
              Добавление питомца
            </h1>

            <p className="mt-2 text-slate-500">
              Заполните данные питомца, чтобы в дальнейшем записывать его на услуги.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Имя питомца
                </label>

                <input
                  type="text"
                  name="name"
                  value={pet.name}
                  onChange={handleChange}
                  placeholder="Например: Мотя"
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Проблемы со здоровьем
                </label>

                <textarea
                  name="healthProblems"
                  value={pet.healthProblems}
                  onChange={handleChange}
                  placeholder="Если есть, кратко опишите"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Тип питомца
                </label>

                <select
                  name="type"
                  value={pet.type}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
                >
                  {Object.entries(PetTypeMap).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Сохраняем..." : "Добавить питомца"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1b2b6b] ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  Назад
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
  );
}