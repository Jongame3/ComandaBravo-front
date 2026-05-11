import { useState } from "react";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";


function Authentication() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

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
                            value = {username}
                            onChange={(e)=> setUsername(e.target.value)}
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
                    <button className = "bg-blue-800 w-50 rounded-full inline-flex items-center justify-center cursor-pointer px-3 py-2 text-md text-white">Войти</button>
                    <button className = "bg-blue-800 w-50 rounded-full inline-flex items-center justify-center cursor-pointer px-3 py-2 text-md text-white">Зарегистрироваться</button>
                </div>
            </div>
        </section>
    )
}

export default Authentication