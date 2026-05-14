import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

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
            alert(data.message);
            return;
        }

        const user = {
            id: data.id,
            username : data.username,
            role : data.role,
        };

        console.log(data)
        loginf(data.message, user)
        
        
        navigate("/")
    }
    



    return (
        <section className="min-h-screen flex itmes-center justify-center px-16 py-16">
            <div className="w-full max-w-3xl  rounded-4xl bg-linear-to-br from-blue-600 to-sky-500 p-8 md:p-14 lg:p-16 shadow-2xl shadow-blue-200/60 flex flex-col justify-center gap-10">
                <h1 className="max-w-xl text-4xl font-extrabold text-center leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    Вход в аккаунт
                </h1>
                <div className='flex justify-center pt-5'>
                    <div className='border-2 border-gray-400 bg-white w-2xl rounded-2xl px-4 shadow-sm transition focus-within:border-gray-700'>
                        <input 
                            className='w-full min-h-15 outline-none'
                            type="text" 
                            placeholder='Введите логин'
                            value = {login}
                            onChange={(e)=> setLogin(e.target.value)}
                            />
                    </div>
                </div>
                <div className='flex justify-center pt-5'>
                    <div className='border-2 border-gray-400 bg-white w-2xl rounded-2xl px-4 shadow-sm transition focus-within:border-gray-700'>
                        <input 
                            className='w-full min-h-15 outline-none'
                            type="text" 
                            placeholder='Введите пароль'
                            value = {password}
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                    </div>
                </div>
                <div className="flex justify-center gap-10">
                    <button className = "bg-blue-800 w-50 rounded-full inline-flex items-center justify-center cursor-pointer px-3 py-2 text-md text-white"
                            onClick={handleLogin}>Войти</button>
                    <NavLink to = "/registration" className={"bg-blue-800 w-50 rounded-full inline-flex items-center justify-center cursor-pointer px-3 py-2 text-md text-white"}>Зарегистрироваться</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Authentication