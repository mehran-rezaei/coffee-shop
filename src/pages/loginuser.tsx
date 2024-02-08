import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { notify } from "@/helpers/toust";
import "react-toastify/dist/ReactToastify.css";
import { Getsmscode } from "@/Dataservice/LoginProvider";
import axios from "axios";
import Link from "next/link";
// context
import { signUpIn } from "@/context/signUpIn";
import Input from "@mui/material";
import axiosinstance from "@/Dataservice/Configs/axiosInstance";
import { Router } from "next/router";
import { getCookie, setCookie } from "@/Dataservice/Configs/cookieProvider";
import Cookies from "js-cookie";
const loginuser = () => {
  const { state, dispatch } = useContext(signUpIn);

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
  const router = useRouter();

  const [data, setData] = useState<any>({
    userName: "",
    passWord: "",
  });
  const changeHandler = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (data.userName.length > 0 && data.passWord.length) {
      const postData = await axiosinstance
        .post("/Secuirty/CreateTokenForUser", {
          username: data.userName,
          password: data.passWord,
        })
        .then((res) => {
          setCookie("token", res.data.token);
          setCookie("refreshTokenUser", res.data.refreshToken);
          notify("success", "با موفقیت وارد شدید");
          Cookies.set("name", data.userName);
          Cookies.set("Isuser", "true");
          setTimeout(function () {
            router.push("/");
          }, 2000);
        })

        .catch((res) => {
          notify("err", "اطلاعات نا معتبر");
        });

      //   dispatch({ type: "ON_VALIDATION", payload: data.phone });
      //dispatch({ type: "ON_VALIDATION" });
      //   getsmscode();
    } else {
      notify("err", "همه ی عبارات را پر کنید");
    }
  };
  const goHomee = () => {
    router.push("/");
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
              <div className="mt-2 px-2 sm:px-0">
                <h2 className="text-base font-semibold mb-3 text-[#652D0D]">
                  نام کاربری و رمز عبور خود را وارد کنید
                </h2>

                <div>
                  <TextField
                    inputProps={{ type: "tel" }}
                    sx={ariaLabel}
                    size="small"
                    //             // style={{ width: 450 }}
                    className="w-11/12 sm:w-[450px] "
                    label="نام کاربری"
                    onChange={changeHandler}
                    value={data.userName}
                    name="userName"
                    id="outlined-basic"
                    type="number"
                    variant="outlined"
                  />
                </div>

                <div className="mt-10">
                  <TextField
                    inputProps={{ type: "tel" }}
                    sx={ariaLabel}
                    size="small"
                    //             // style={{ width: 450 }}
                    className="w-11/12 sm:w-[450px] "
                    label="رمز عبور"
                    onChange={changeHandler}
                    value={data.passWord}
                    name="passWord"
                    id="outlined-basic"
                    type="number"
                    variant="outlined"
                  />
                </div>
              </div>

              <div className="mt-10 flex w-[50%] sm:w-auto justify-between sm:justify-start">
                <Link
                  href="/"
                  className="
                text-[12px] sm:text-[14px] py-1 w-[100%] font-medium rounded-sm  sm:w-[118px] border border-[#652D0D] text-[#652D0D] ml-4 sm:ml-14 hover:text-[#f1f1f1] hover:bg-[#652d0d] duration-300 transition-all
                "
                >
                  <button
                    type="button"
                    onClick={goHomee}
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

export default loginuser;
