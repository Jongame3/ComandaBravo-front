import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../Functions/apiFetch";
import { useAuth } from "../components/AuthContext";
import Header from "../components/Header";
import { useToast } from "../components/ToastContext";

type UserUpdate = {
  id: number;
  username: string;
  oldPassword: string;
  newPassword: string;
  email: string;
  contacts: string;
};

export default function UpdateUserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {showToast} = useToast();

  const [formData, setFormData] = useState<UserUpdate>({
    id: user?.id || 0,
    username: user?.username || "",
    oldPassword: "",
    newPassword: "",
    email: "",
    contacts: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      id: user?.id || 0,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiFetch("/User", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Не удалось обновить профиль");
      }

      showToast("Профиль успешно обновлён","success");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      showToast("Ошибка при обновлении профиля","error");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setFormData({
      id: user?.id || 0,
      username: user?.username || "",
      oldPassword: "",
      newPassword: "",
      email: "",
      contacts: "",
    });
  }

  return (
    <>
        <Header /><section className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-xl rounded-[28px] bg-white p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
              <h1 className="text-3xl font-extrabold text-[#1b2b6b]">
                  Обновление профиля
              </h1>

              <p className="mt-2 text-slate-500">
                  Измените данные аккаунта. Для смены пароля укажите старый и новый пароль.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                      <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                          Имя пользователя
                      </label>

                      <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Введите имя пользователя"
                          className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
                  </div>

                  <div>
                      <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                          Старый пароль
                      </label>

                      <input
                          type="password"
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleChange}
                          placeholder="Введите старый пароль"
                          className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
                  </div>

                  <div>
                      <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                          Новый пароль
                      </label>

                      <input
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Введите новый пароль"
                          className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
                  </div>

                  <div>
                      <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                          Email
                      </label>

                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Введите email"
                          className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
                  </div>

                  <div>
                      <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                          Контакты
                      </label>

                      <input
                          type="text"
                          name="contacts"
                          value={formData.contacts}
                          onChange={handleChange}
                          placeholder="Введите номер телефона или другой контакт"
                          className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                      <button
                          type="submit"
                          disabled={loading}
                          className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                          {loading ? "Сохранение..." : "Сохранить изменения"}
                      </button>

                      <button
                          type="button"
                          onClick={handleClear}
                          className="rounded-full bg-[#eef3ff] px-6 py-3 text-sm font-semibold text-[#1b2b6b] transition hover:bg-[#e5edff]"
                      >
                          Очистить
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
      </section></>
  );
}