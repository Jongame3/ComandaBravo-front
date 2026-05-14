import  { useState } from 'react';

type ProductCardProps = {
    name: string;
    descryption : string;
    price : number;
};



const ProductCard = ({ name, descryption, price }: ProductCardProps) =>  {
    const [hasliked,setHasLiked] = useState(false)
    const [count,setCount] = useState(0)
    
    const handleLike = () => {
        if (hasliked){
            setCount(count - 1);
            setHasLiked(false); 
        }
        else{
            setCount(count + 1);
            setHasLiked(true);
        }

    };

    return (
        <div className="bg-green-200 rounded-lg shadow-md p-4
                        transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-green-300 relative min-h-45 ">
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="mt-2">
                <p className="text-gray-600 text-sm">{descryption}</p>
                <p className="text-gray-900 mt-2">Стоимость: {price}</p>
                <button onClick={() => { handleLike(); }} 
                className="w-36 mt-3 absolute bottom-3 right-3 bg-green-400 rounded-full hover:bg-green-200
                inline-flex items-center justify-center cursor-pointer px-3 py-2 text-xl">
                    Записаться
                </button> 
            </div>
        </div>
    )
}

export default ProductCard;