import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signUpIn } from "@/context/signUpIn";
import { ToastContainer } from "react-toastify";
import { notify } from "../../helpers/toust";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateTokenForCustomer,
  GetCustomerByPhoneNumber,
} from "@/Dataservice/LoginProvider";
import { checkIfTheCustomerIsNew } from "@/Dataservice/LoginProvider";
import { TextField } from "@mui/material";
import Link from "next/link";
import Cookies from "js-cookie";
// import { updateAxiosInstance } from "@/Dataservice/Configs/axiosInstance";
interface Token {
  token: String;
  refreshToken: String;
}
interface userdata {
  id: number;
  code: string;
  name: string;
  address: string;
  phoneNumber: string;
  isEnabled: boolean;
  isCustomer: boolean;
}
const NumberValidate = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(signUpIn);
  const [Token, setToken] = useState<Token>({} as Token);
  const [step, setstep] = useState<boolean>();
  const [Flag, setFlag] = useState<boolean>(false);
  const [userinfo, setuserinfo] = useState<userdata>({} as userdata);
  const ariaLabel = {
    // input: { color: 'white' },
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
  const [dataValidate, setDataValidate] = useState<any>("");
  // const changeHandler = (event: any) => {
  //   setDataValidate({
  //      event.target.value,
  //   });
  // };
  const nextstep = () => {
    if (dataValidate.code) {
      dispatch({ type: "ON_GETCOFFEE" });
      // dispatch({type: "ON_SIGNUP"})
    } else {
      notify("err", "کد وارد شده صحیح نمی باشد");
    }
  };

  ///////////////////////////////////////////////////////////////////////
  const submitHandler = async (event: any) => {
    event.preventDefault();
    try {
      const Response = await CreateTokenForCustomer(
        state.phoneNumber,
        dataValidate
      );
      if (Response.data.isSuccess) {
        Cookies.set("token", Response.data.data.token);
        Cookies.set("refreshToken", Response.data.data.refreshToken);
        // updateAxiosInstance();
        setToken(Response.data.data);
      } else {
        notify("err", "! رمز اشتباه است ");
      }
    } catch (error) {
      notify("err", "! رمز اشتباه است ");
    }
  };
  useEffect(() => {
    if (!!Token.token) {
      checkIfTheCustomerIsNew(state.phoneNumber).then((Response) => {
        setstep(Response.data);
        setFlag(true);
      });
    }
  }, [Token]);
  useEffect(() => {
    if (!!Flag) {
      if (step == true) {
        // dispatch({ type: "ON_GETCOFFEE" });

        dispatch({ type: "ON_SIGNUP" });
      } else {
        // dispatch({ type: "ON_SIGNUP" });

        notify("success", "با موفقیت وارد شدید");
        // GetCustomerByPhoneNumber(state.phoneNumber).then((Response) => {});
        setinfouser();
        setTimeout(() => {
          router.push("/");
          dispatch({ type: "ON_LOGIN" });
        }, 2500);
      }
    }
  }, [step]);
  const setinfouser = () => {
    GetCustomerByPhoneNumber(state.phoneNumber).then((Response) => {
      setuserinfo(Response.data.data);
    });
  };
  useEffect(() => {
    if (!!userinfo.id) {
      dispatch({ type: "ON_SETNAME", payload: userinfo.name });
      dispatch({ type: "ON_SETADDRESS", payload: userinfo.address });
      Cookies.set("name", userinfo.name);
      Cookies.set("address", userinfo.address);
      Cookies.set("phonenumber", userinfo.phoneNumber);
    }
  }, [userinfo]);

  //////////////////////////////////////////////////////////////////////
  return (
    <>
      <div></div>
      <div className="for_app h-screen flex flex-col gap-20">
        <div className="w-full h-[30%]">
          <div className="Hero_con1 w-100 h-[100%]"></div>
          <div className="absolute left-0 w-full top-[10%] flex justify-center h-[25vh] ">
            <div className="w-2/3 md:w-2/4 lg:w-1/3 h-auto relative  ">
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
              <div className="flex flex-col items-center ">
                {/* header */}
                <img src="../images/Login.png" alt="" />
                <img src="../images/home_coffee_heading1.png" alt="" />
              </div>
              <div className="mt-6 w-3/4 md:w-2/4 px-2 sm:px-0">
                <h2 className="text-sm sm:text-base font-semibold text-[#652D0D]">
                  کد تایید ارسال شده را وارد کنید
                </h2>
                <h3 className="text-xs sm:text-sm font-semibold mt-3 mb-5 text-[#652D0D]">
                  کد تایید چهار رقمی به شماره {state.phoneNumber} ارسال شد
                </h3>
                <TextField
                  inputProps={{ style: { height: "19px", fontSize: "14px" } }}
                  sx={ariaLabel}
                  size="small"
                  style={{ width: "70%" }}
                  // className="w-11/12 sm:w-[450px]"
                  label="کد تایید"
                  onChange={(event: any) => setDataValidate(event.target.value)}
                  value={dataValidate}
                  name="code"
                  id="outlined-basic"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>
              <div className="w-3/4">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center gap-4 items-center w-full">
                    <h3 className="mt-3 mb-3 text-[#652D0D] text-xs sm:text-sm font-semibold">
                      کدی دریافت نکردید؟
                    </h3>
                    <h3 className="my-2 text-[#652D0D] text-xs sm:text-sm font-semibold">
                      تصحیح شماره موبایل
                    </h3>
                  </div>

                  {/* <div className="flex w-[90%] sm:w-[400px] justify-between">
                <h3 className="my-1 text-[#652D0D] text-xs sm:text-sm font-semibold">
                  پیامک مجدد کد
                </h3>
                <img src="../images/bBeetwen.png" alt="" />
                <h3 className="my-1 text-[#652D0D] text-xs sm:text-sm font-semibold">
                  ارسال کد با تماس
                </h3>
              </div> */}
                  <div className="mt-3">
                    <img src="../images/mBottom.png" alt="" />
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "ON_LOGIN" })}
                    className="text-[12px] sm:text-[14px] py-1 font-medium rounded-sm w-[30%] sm:w-[118px] border border-[#652D0D] text-[#652D0D] ml-4 sm:ml-14 hover:text-[#f1f1f1] hover:bg-[#652d0d] duration-300 transition-all"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    className="text-[12px] sm:text-[14px] py-1 font-medium rounded-sm w-[60%] sm:w-[261px] border border-[#652D0D] text-[#f1f1f1] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#f1f1f1] duration-300 transition-all"
                  >
                    تـاییـد و ادامـه
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default NumberValidate;
