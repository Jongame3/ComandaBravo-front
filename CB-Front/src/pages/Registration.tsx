import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastContext";

type RegistrationResponse = {
    isSucces : boolean,
    message : string,
    id : number;
}

function Registration() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [contacts, setContacts] = useState("");
    const [loading, setLoading] = useState(false);
    const {showToast} = useToast();

    const navigate = useNavigate();

    async function handleRegistration(e: React.SubmitEvent) {
        e.preventDefault();
        try{
          if(password.length < 8) {
            showToast("Пароль слишком короткий", "error");
            return}
            setLoading(true);
        const response = await fetch("https://localhost:7061/api/reg" , 
            {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify({username,password,email,contacts}), 
            });
        const data : RegistrationResponse = await response.json();

        if(!response.ok || !data.isSucces) {
            showToast(data.message, "error");
            return;
        }
            showToast("Регистрация прошла успешно", "success");
            navigate("/");
            return;
        } catch (error) {
            console.error(error);
            showToast("Ошибка при регистрации", "error");
        } finally {
            setLoading(false);
        }   
    }
    
    return (
         <section className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
        <div className="w-full mx-auto max-w-xl rounded-[28px] bg-white p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
        <h1 className="text-3xl font-extrabold text-[#1b2b6b]">
          Регистрация
        </h1>

        <p className="mt-2 text-slate-500">
          Создайте аккаунт, чтобы записывать питомцев на услуги и управлять
          своим профилем.
        </p>

        <form onSubmit={handleRegistration} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Имя пользователя
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Почта
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите почту"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Пароль
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль, не менее 8 символов"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Номер телефона
            </label>

            <input
              type="text"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              placeholder="Введите номер телефона"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
              required
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1b2b6b] ring-1 ring-slate-200 transition hover:bg-slate-50 cursor-pointer"
            >
              Назад
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


export default Registration