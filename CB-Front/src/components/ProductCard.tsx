import  React, { useState } from 'react';

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
        <div className="bg-green-300 rounded-lg shadow-md p-4
                        transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-green-400 ">
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="mt-2">
                <p className="text-gray-600">{descryption}</p>
                <p className="text-gray-900">{price}</p>
                <div className='flex justify-between'>
                    <button onClick={() => { handleLike(); }} className="cursor-pointer mt-2 text-xl flex">
                        <p>Like</p>
                        {hasliked ? '❤️' : '🤍'}
                    </button> 
                    <p className='mt-2'>{count}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;