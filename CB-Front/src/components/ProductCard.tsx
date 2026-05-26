import {useNavigate } from 'react-router-dom';
import { type Product } from '../data/adminType';
import { useAuth } from './AuthContext';
import { apiFetch } from '../Functions/apiFetch';

const ProductCard = ({ name, description, price, id,  duration}: Product) =>  {
    const navigate = useNavigate();

    const {user} = useAuth()
    async function handleDelete() {
        const response = await apiFetch(`/product?id=${id}`,{
            method: "DELETE"
        })
        if(!response.ok) {
            throw new Error("{ezatkmrb");
        }
    }

    return (
        <div className="bg-green-200 rounded-lg shadow-md p-4
                        transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-green-300 relative min-h-45 ">
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="mt-2">
                <p className="text-gray-600 text-sm">{description}</p>
                <p className="text-gray-900 mt-2">Стоимость: {price} MDL</p>
                <p className="text-gray-900 mt-2">Длительность: {duration} ч.</p>
                {user?.role === 20 ? 
                <div className='flex items-center justify-center'>
                    <button onClick={() => navigate(`/productchange/${id}`)} className="w-30 mt-3 mx-4 bottom-3 right-3 bg-amber-300 rounded-full hover:bg-amber-400 inline-flex items-center justify-center cursor-pointer px-3 py-2 text-xl">Изменить</button>
                    <button onClick={handleDelete} className="w-30 mt-3 bottom-3 right-3 bg-red-300 rounded-full hover:bg-red-400 inline-flex items-center justify-center cursor-pointer px-3 py-2 text-xl">Удалить</button>
                </div> 
                : 
                <button onClick={() => navigate(`/booking/${id}`)} className="w-36 mt-3 absolute bottom-3 right-3 bg-green-400 rounded-full hover:bg-green-200 inline-flex items-center justify-center cursor-pointer px-3 py-2 text-xl">Записаться</button>}
                
            </div>
        </div>
    )
}

export default ProductCard;