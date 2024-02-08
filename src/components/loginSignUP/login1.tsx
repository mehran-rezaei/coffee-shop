import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { notify } from "../../helpers/toust";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Getsmscode } from "@/Dataservice/LoginProvider";
import axios from "axios";
import Link from "next/link";
import { Router } from "next/router";

// context
import { signUpIn } from "@/context/signUpIn";
import Input from "@mui/material";
const Login1 = () => {
  const { state, dispatch } = useContext(signUpIn);

  const router = useRouter();
  const ariaLabel = {
    // input: { color: 'white' },
    height: "19px",
    fontSize: "14px",
    "& label.Mui-focused": {
      color: "#652D0D",
    },
    "& label": {
      color: "#652D0D",
      opacity: "0.9",
      fontSize: "13px",
      fontWeight: "700",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#652D0D",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#652D0D",
      },
      "&:hover fieldset": {
        borderColor: "#652D0D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#652D0D",
      },
      "& .MuiInputBase-root": {
        color: "#652D0D",
      },
    },
  };
  const getsmscode = () => {
    try {
      Getsmscode(data.phone).then(() => {});
    } catch (error: any) {
      {
        // notify("err", "عملیات با خطا مواجه شد");
      }
    }
  };
  const [data, setData] = useState<any>({
    phone: "",
    name: "",
  });
  const changeHandler = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (/^(\+98|0)?9\d{9}$/g.test(data.phone)) {
      dispatch({ type: "ON_VALIDATION", payload: data.phone });
      //dispatch({ type: "ON_VALIDATION" });
      getsmscode();
    } else {
      notify("err", "شماره وارد شده معتبر نمیباشد");
    }
  };
  const Personel = () => {
    router.push("/loginuser");
  };
  return (
    <>
      <div className="for_app h-screen flex flex-col gap-20">
        <div className="w-full h-[30%]">
          <div className="Hero_con1 w-100 h-[100%]"></div>
          <div className="absolute left-0 w-full top-[10%] flex justify-center h-[25vh] ">
            <div className="w-2/3 md:w-2/4 lg:w-1/3 h-auto relative ">
              <img
                className="w-full h-auto"
                src="../images/3.png"
                alt="images"
              />
            </div>
          </div>
        </div>
        <div className=" h-[80%] flex flex-col justify-center">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col items-center text-center  ">
              {/* <div className="flex flex-col items-center "> */}
              {/* header */}
              {/* <img src="../images/Login.png" alt="" />
                <img src="../images/home_coffee_heading1.png" alt="" />
              </div> */}
              <div className="mt-6 px-2 sm:px-0">
                <h2 className="text-base font-semibold text-[#652D0D]">
                  شماره همراه خود را وارد کنید
                </h2>
                <h3 className="text-sm font-semibold mt-3 mb-8 text-[#652D0D]">
                  با وارد کردن شماره موبایل کد تاییدی برای شما ارسال خواهد شد
                </h3>
                <TextField
                  inputProps={{ type: "tel" }}
                  sx={ariaLabel}
                  size="small"
                  //             // style={{ width: 450 }}
                  className="w-11/12 sm:w-[450px]"
                  label="شماره همراه"
                  onChange={changeHandler}
                  value={data.phone}
                  name="phone"
                  id="outlined-basic"
                  type="number"
                  variant="outlined"
                />
              </div>

              <div className="mt-10 flex w-[50%] sm:w-auto justify-between sm:justify-start">
                <Link
                  href="/"
                  className="
                text-[12px] sm:text-[14px] py-1 px-4 font-medium rounded-sm  sm:w-[118px] border border-[#652D0D] text-[#652D0D] ml-4 sm:ml-14 hover:text-[#f1f1f1] hover:bg-[#652d0d] duration-300 transition-all
                "
                >
                  <button
                    type="button"
                    // className="text-[12px] sm:text-[14px] py-1 w-[100%] font-medium rounded-sm  sm:w-[118px] border border-[#652D0D] text-[#652D0D] ml-4 sm:ml-14 hover:text-[#f1f1f1] hover:bg-[#652d0d] duration-300 transition-all"
                  >
                    بازگشت
                  </button>
                </Link>
                <button
                  type="submit"
                  className="text-[12px] sm:text-[14px] py-1 w-[60%] font-medium rounded-sm  sm:w-[261px] border border-[#652D0D] text-[#f1f1f1] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#f1f1f1] duration-300 transition-all"
                >
                  تـاییـد و ادامـه
                </button>
              </div>
              <div className="mt-4 flex w-[50%] sm:w-auto justify-between sm:justify-start">
                <button
                  className="
                      text-[12px] sm:text-[14px] py-1 w-[100%] font-medium rounded-sm  sm:w-[118px] border-b border-b-[#652D0D] text-[#652D0D] ml-4 sm:ml-14   duration-300 transition-all
                      "
                  onClick={Personel}
                  type="button"
                >
                  ورود پرسنل
                </button>
                <button
                  // type="submit"
                  disabled
                  className="text-[12px] opacity-0 sm:text-[14px] py-1 w-[60%] font-medium rounded-sm  sm:w-[261px] border border-[#652D0D] text-[#f1f1f1] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#f1f1f1] duration-300 transition-all"
                >
                  تـاییـد و ادامـه
                </button>
              </div>
              {/* <div  className="w-[30%] py-2 flex mr-2 ">
                <button
              className="text-[12px] sm:text-[14px] py-1 w-[100%] font-medium rounded-sm  sm:w-[100px] border border-[#652D0D] text-[#f1f1f1] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#f1f1f1] duration-300 transition-all"
                >
                  ورود پرسنل
                </button>
              </div> */}
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login1;
