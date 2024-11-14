import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';

const Mains = () => {
    return (
        <div className='max-w-xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Mains;