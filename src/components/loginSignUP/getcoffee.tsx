import React , { useState, useContext} from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router'


// context
import {signUpIn} from '@/context/signUpIn';
 

const Getcoffee = () => {
  const {state , dispatch} = useContext(signUpIn)
  let router = useRouter()
  const ariaLabel = {
    // input: { color: 'white' },
    '& label.Mui-focused': {
      color: '#652D0D',
    },
    '& label': {
      color: '#652D0D',
      opacity: '0.9',
      fontSize : "13px",
      fontWeight : '700',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#652D0D',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#652D0D',
      },
      '&:hover fieldset': {
        borderColor: '#652D0D',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#652D0D',
      },
      '& .MuiInputBase-root': {
        color: '#652D0D',
      },
    },
  };
  const [data , setData] = useState<any>({
    description : '',
    name : '',
    lastName : '',
    deskNumber : '',
    incoffeee : false,
    getOut : false,
    peyk : true
  })
  
  const changeHandler = (event:any) => {
    setData({ ...data , [event.target.name] : event.target.value })
}
const submitHandler = async(event:any) => {
      event.preventDefault()
      dispatch({type: "ON-CHECKOUT"})
      router.push('/chockout');



      // if(dataValidate.code){
      //   dispatch({type: "ON_GETCOFFEE"})
      //   // dispatch({type: "ON_SIGNUP"})     
      // } else{
      // }

      // const sendData = await axios.post('http://etokco.ir/Secuirty/createToken',
      // {
      //   description : '',
      //   name : '',
      //   lastName : '',
      //   deskNumber : '',
      //   incoffeee : false,
      //   getOut : false,
      //   peyk : false
      // },
      // {
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // },)
      //   .then(Response => {
      //   })
      //   .catch(err => {
      //   })
        
}
    return (
        <div>
        <div className="Hero_con">
        {/* <Nav /> */}
        <div className="hero_img "><img className='' src="../images/3.png" alt="images" /></div>
        {/* item here : */}
        <form  onSubmit={submitHandler}>

        <div className='flex flex-col items-center text-center  '>
          <div className='flex flex-col items-center '>
            {/* header */}
            <img src="../images/Login.png" alt="" />
            <img src="../images/home_coffee_heading1.png" alt="" />
          </div>
          <div className='mt-4 px-3 sm:px-0'>
          <h2 className='text-[14px] font-semibold text-[#652D0D]'>اطلاعات کاربری</h2>
          <h3 className='text-[13px] font-bold mt-2 mb-4 text-[#652D0D]'>در این بخش شما می توانید، اطلاعات خود را وارد کنید</h3>
          </div>
          <div className='sm:flex sm:w-[450px] justify-between mb-3'>
            <div className='mb-3 sm:mb-0'>
            <TextField
           inputProps={{style: { height: '17px',fontSize : "14px" },}}
                sx={ariaLabel}
                size="small"
                className='w-11/12 sm:w-[200px]'
                // style={{ width: 200 }}
                label="نام"
                onChange={changeHandler}
                value={data.name}
                name="name"
                id="outlined-basic"
                type="text"
                variant="outlined"
              />
            </div>
            <div>
            <TextField
           inputProps={{style: { height: '17px',fontSize : "14px" },}}
                sx={ariaLabel}
                size="small"
                className='w-11/12 sm:w-[200px]'
                // style={{ width: 200 }}
                label="نام خانوادگی"
                onChange={changeHandler}
                value={data.lastName}
                name="lastName"
                id="outlined-basic"
                type="text"
                variant="outlined"
              />
            </div>
 
   
              </div>
              <div>
                <h1 className='text-[14px] font-semibold text-[#652D0D]'>لطفا طریقه دریافت خود را انتخاب کنید</h1>
                <div className='flex mt-3 mb-6 sm:mb-3 w-[200px] sm:w-[350px] justify-between items-center'>
                    <div className='flex'>
                    <input type="checkbox" name="داخل کافه" id=""
                    defaultChecked={data.incoffeee} onChange={()=> setData({...data , incoffeee : !data.incoffeee})} 

                     />
                     <span className='text-[13px]  mr-1 font-semibold text-[#652D0D]'>داخل کافه</span>
                    </div>
                  
                    <div className='flex'>
                    <input type="checkbox"  name="" id="" 
                    defaultChecked={data.peyk} onChange={()=> setData({...data , peyk : !data.peyk})} 
                    />
                     <span className='text-[13px] mr-1  font-semibold text-[#652D0D]'>پیک</span>
                    </div>
                    <div className='flex'>
                    <input type="checkbox"  name="" id="" 
                    defaultChecked={data.getOut} onChange={()=> setData({...data , getOut : !data.getOut})} 
                    />
                     <span className='text-[13px] mr-1  font-semibold text-[#652D0D]'>بیرون بر</span>
                    </div>

                </div>
              </div>
          <div className='mb-2'>
          <TextField
           inputProps={{style: { height: '19px',fontSize : "14px" },}}
                sx={ariaLabel}
                size="small"
                className='w-[250px] sm:w-[450px]'
                // style={{ width: 450 }}
                label="شماره میز"
                onChange={changeHandler}
                value={data.deskNumber}
                name="deskNumber"
                id="outlined-basic"
                type="number"
                variant="outlined"
              />
              
          </div>
          <div className='mb-2'>
          <TextField
           inputProps={{style: { height: '34px',fontSize : "14px" },}}
                sx={ariaLabel}
                size="small"
                className='w-[250px] sm:w-[450px]'
                // style={{ width: 450 }}
                label="توضیحات"
                onChange={changeHandler}
                value={data.description}
                name="description"
                id="outlined-basic"
                type="text"
                variant="outlined"
              />
          </div>

          <div className='mt-3 flex w-[90%] sm:w-auto justify-between sm:justify-start'>
            <button 
              type='button'
              onClick={()=>  dispatch({type: "ON_LOGIN"})}
            className='text-[12px] sm:text-[14px] py-1 font-medium rounded-sm w-[30%] sm:w-[118px] border border-[#652D0D] text-[#652D0D] ml-7 sm:ml-14 hover:text-[#f1f1f1] hover:bg-[#652d0d] duration-300 transition-all'
            >بازگشت</button>
            <button  type='submit'
            className='text-[12px] sm:text-[14px] py-1 font-medium rounded-sm w-[60%] sm:w-[261px] border border-[#652D0D] text-[#f1f1f1] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#f1f1f1] duration-300 transition-all'
            >تـاییـد  و  ادامـه</button>

          </div>
        </div>
        </form>
      </div>
      </div>
  
    );
};

export default Getcoffee;