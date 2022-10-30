import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className='flex justify-between items-center h-16 px-5 shadow-md bg-stone-800 text-white'>
            <h3 className='font-bold text-white'> GitHub Search </h3>

            <span className='flex gap-4'>
                <Link className='hover:text-stone-300 hover:underline text-lg' to='/'>Home</Link>
                <Link className='hover:text-stone-300 hover:underline text-lg' to='/favorite'>MyFavorite</Link>
            </span>
        </nav>
    );
};

export default Navigation;