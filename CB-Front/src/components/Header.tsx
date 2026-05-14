import {Link, NavLink} from 'react-router-dom'
import logo from '../assets/paw-svgrepo-com.svg'
import { useAuth } from './AuthContext';

function Header() {
    const {isAuthenticated, user,} = useAuth()
  return (
    <nav className="shadow-md bg-linear-to-br from-blue-700 to-sky-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-10 h-10 grow-0"/>
            <Link to="/" className="text-4xl font-bold justify-self-start grow">
                Comanda Bravo
            </Link>

            <div className="hidden md:flex space-x-6">
                <NavLink to = "/"  className={' px-4 py-3 rounded-lg font-medium text-black transition duration-300 hover:bg-sky-200 hover:text-blue-500'}>Главная</NavLink>
                <NavLink to = "/about" className={' px-4 py-3 rounded-lg font-medium text-black transition duration-300 hover:bg-sky-200 hover:text-blue-500'}>О нас</NavLink>
                <NavLink to = "/contact" className={' px-4 py-3 rounded-lg font-medium text-black transition duration-300 hover:bg-sky-200 hover:text-blue-500'}>Контакты</NavLink>
                {!isAuthenticated ? 
                <NavLink to = "/auth" className={' px-4 py-3 rounded-lg font-medium text-black transition duration-300 hover:bg-sky-200 hover:text-blue-500'}>Войти</NavLink>
                : user?.role === 20 ?
                <NavLink to = "/admin" className={' px-4 py-3 rounded-lg font-medium text-black transition duration-300 hover:bg-sky-200 hover:text-blue-500'}>Панель ветеринара</NavLink>
                :
                <NavLink to = "/profile" className={' px-4 py-3 rounded-lg font-medium text-black transition duration-300 hover:bg-sky-200 hover:text-blue-500'}>{user?.username}</NavLink>
                }
            </div>
        </div>
    </nav>
  );
}

export default Header;
