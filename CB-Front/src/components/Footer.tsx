import {NavLink} from 'react-router-dom'

function Footer () {
    return (
        <footer className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-6 py-10 ">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h3 className="text-lg font-semibold text-white">ComandaBravo</h3>
                    <p className="text-sm font-semibold text-gray-500">Одна из лучших ветеринарных клиник Кишнева</p>
                </div>
                <div className="flex gap-6 text-sm text-gray-500">
                    <NavLink to ="/about" className="hover:text-white">О нас</NavLink>
                    <NavLink to ="/" className="hover:text-white">Главная страница</NavLink>
                </div>
            </div>

            <div className=" border-t border-gray-900 pt-4 text-xs text-center pb-4 text-gray-500">
                © 2026 ComandaBravo
            </div>
        </footer>
    )
}

export default Footer