import  React, { useState } from 'react';

type ProductCardProps = {
  name: string;
};



const ProductCard = ({ name }: ProductCardProps) =>  {
    const [hasliked,setHasLiked] = useState(false)
    const [count,setCount] = useState(25)
    
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
        <div className="bg-blue-200 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="mt-2">
                <p className="text-gray-600">Description of the product.</p>
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