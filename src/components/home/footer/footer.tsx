import React from 'react';
// import ff from '../../../../images/vector 9.png'

const Footer = () => {
    return (
        <div className='mt-20'>
            <div className='flex justify-center items-center mb-16 '>
                  <img src='../../../../images/Vector 9.png'  alt="" />
            </div>


            <div className='flex justify-center items-center mb-16'>
                 <img src='../../../../images/home_coffee_image_cup1.png' className='w-[200px]' alt="" />
            </div>



            <div className='flex justify-center items-center  mb-3'>
                 <img src='../../../../images/aboutUs.png' alt="" />
            </div>
            <div className='flex justify-center items-center'>
          <img src='../../../../images/home_coffee_heading1.png' alt="" />
            </div>


            <div className='flex justify-center items-center mt-20 '>
                <h3 className='sm:w-[30%] text-[#652D0D] px-4 text-center font-medium text-[18px] sm:text-[20px] '>
                ما با داشتن محیطی خانوادگی و شیک 
                    اماده ی پذیرایی به شما مشتریاین عزیز هستیم 
                </h3>
            </div>


            <div className='flex justify-center items-center  mt-20 mb-3'>
                 <img src='../../../../images/callus.png' alt="" />
            </div>
            <div className='flex justify-center items-center mb-8 '>
          <img src='../../../../images/home_coffee_heading1.png' alt="" />
            </div>


            <div className='flex  justify-center items-center pb-14  flex-col
            text-[#652D0D] text-center font-medium text-[20px]'>
                <div className='sm:w-[50%]'>
                    <div className='flex justify-center my-3'>
                        <img src="../../../../images/Phone.png"     className='ml-3 h-[20px]' alt="" />
                        <img src="../../../../images/Telegram.png"  className='ml-3 h-[20px]'    alt="" />
                        <img src="../../../../images/Instagram.png" className='ml-3 h-[20px]'     alt="" />
                    </div>
                <h3>061-4552468</h3>
                <h3>amir.sokolat@gmail.com</h3>
                </div>
            </div>
        
        </div>
    );
};

export default Footer;