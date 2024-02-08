import React, { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import {notify} from '../helpers/toust'
import 'react-toastify/dist/ReactToastify.css';
import Router, {useRouter} from 'next/router'
import {signUpIn} from '@/context/signUpIn';

const Chockout = () => {
  let router = useRouter()
  const {state , dispatch} = useContext(signUpIn)
  useEffect(()=> {
    if(!state.showCheckOut) { 
      router.push('/') 
    }
  },[])
  
  
  notify('success','سفارش شما با موفقیت ثبت شد')


    return (
      
        <div className='text-center text-[50px]'>
      {state.showCheckOut &&
      <div>
          سفارش شما ثبت شد :)))))))  
      <ToastContainer />
      </div>
      }
        </div>
    );
};

export default Chockout;