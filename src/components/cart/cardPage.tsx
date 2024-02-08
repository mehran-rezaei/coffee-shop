import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import CartTable from './cartTable';
// import CardResult from './cardResult';
import dynamic from 'next/dynamic'
const CartTable = dynamic(() => import('./cartTable'), {
  ssr: false,
})
const CardResult = dynamic(() => import('./cardResult'), {
  ssr: false,
})


const CardPage = () => {
  const [nothing,setnothing]=useState(false)
    return (
        <div className='for_app pt-5 h-[100vh]'>
            <div className='flex flex-col items-center mb-5 '>
            {/* header */}
            <img src="../../images/sabadeKharid.png" alt="" className='mb-2' />
            <img src="../../images/home_coffee_heading1.png" alt="" />
          </div>
          <div>
            {/* table */}
            <CartTable setnothing={setnothing} nothing={nothing} />
            {/* bottom section */}
            <div className='flex justify-center'>
            <CardResult />
            </div>
          </div>
            
        </div>
    );
};

export default CardPage;