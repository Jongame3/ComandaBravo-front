import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastContext";

type AuthResponse = {
    isSucces : boolean,
    message : string,
    id : number,
    username : string,
    role : 1 | 20 ,
}

function Authentication() {
    const [login,setLogin] = useState("")
    const [password,setPassword] = useState("")

    const {loginf} = useAuth();
    const navigate = useNavigate();
    const {showToast} = useToast();

    async function handleLogin() {

        const response = await fetch("https://localhost:7061/api/session/auth" , 
            {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify({login,password,}), 
            });
        const data : AuthResponse = await response.json();
        if(!response.ok || !data.isSucces) {
            showToast("Неверный логин или пароль", "error");
            setLogin("");
            setPassword("");
            return;
        }

        const user = {
            id: data.id,
            username : data.username,
            role : data.role,
        };

        loginf(data.message, user)
        navigate("/")
    }
    



    return (
        <section className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
            <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
                <h1 className="text-3xl font-extrabold text-[#1b2b6b]">
                Вход в аккаунт
                </h1>

                <p className="mt-2 text-slate-500">
                Войдите в профиль, чтобы записывать питомцев на услуги и управлять своими данными.
                </p>

                <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                className="mt-6 space-y-4"
                >
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                    Логин
                    </label>

                    <input
                    type="text"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
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
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
                    required
                    />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                    <button
                    type="submit"
                    className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
                    >
                    Войти
                    </button>

                    <NavLink
                    to="/"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1b2b6b] ring-1 ring-slate-200 transition hover:bg-slate-50"
                    >
                    Назад
                    </NavLink>
                </div>
                </form>
            </div>
        </section>
    )
}

export default Authentication