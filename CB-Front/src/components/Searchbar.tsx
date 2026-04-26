import * as React from 'react';
import { useState } from 'react';

type SearchbarProps = {
    searchTerm : string;
    setSearchTerm : React.Dispatch<React.SetStateAction<string>>;

} 

function Searchbar({searchTerm, setSearchTerm} : SearchbarProps) {
    return (
        <div className='flex justify-center pt-5'>
            <div className='border-2 border-gray-400 w-2xl rounded-2xl px-4 shadow-sm transition focus-within:border-gray-700'>
                <input 
                    className='w-full outline-none'
                    type="text" 
                    placeholder='Выберите нужную вам услугу'
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Searchbar;