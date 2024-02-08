import React, { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
// context
import { signUpIn } from "@/context/signUpIn";
import {
  EditCustomer,
  GetCustomerByPhoneNumber,
} from "@/Dataservice/LoginProvider";
import { ToastContainer } from "react-toastify";
import { notify } from "@/helpers/toust";
import Cookies from "js-cookie";
interface customerinfo {
  id: number;
  code: string;
  name: string;
  address: string;
  phoneNumber: string;
  isEnabled: boolean;
  isCustomer: boolean;
}
const init = {
  taxNumber: "string",
  postalCode: "string",
  city: "string",
  countryId: 0,
  email: "string",
  isSupplier: true,
  dueDatePeriod: 0,
};

const SignUp = () => {
  const { state, dispatch } = useContext(signUpIn);
  const router = useRouter();
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
  const [customerinfo, setcustomerinfo] = useState<customerinfo>(
    {} as customerinfo
  );
  const [firstload, setfirstload] = useState<boolean>(false);
  const changeHandler = (event: any) => {
    setcustomerinfo({
      ...customerinfo,
      [event.target.name]: event.target.value,
    });
  };
  const [next, setnext] = useState();
  const submitHandler = async (event: any) => {
    event.preventDefault();
    // let merged = { ...customerinfo, ...init };
    EditCustomer(customerinfo).then((response) => {
      setnext(response.data.isSuccess);
    });
  };
  useEffect(() => {
    if (next == true) {
      dispatch({ type: "ON_SETNAME", payload: customerinfo.name });
      dispatch({ type: "ON_SETADDRESS", payload: customerinfo.address });
      Cookies.set("name", customerinfo.name);
      Cookies.set("address", customerinfo.address);
      Cookies.set("phonenumber", customerinfo.phoneNumber);
      notify("success", "تغیرات با موفیقت ثبت شد");
      setTimeout(() => {
        router.push("/");
        dispatch({ type: "ON_LOGIN" });
      }, 2500);
    } else {
      notify("err", "تغیرات با خطا مواجه شد");
    }
  }, [next]);
  // if (data.name && data.lastName) {
  //   dispatch({ type: "ON_LOGIN" });
  // } else {
  // }

  // const sendData = await axios.post('http://etokco.ir/Secuirty/createToken',
  // {
  //   address : data.address,
  //   name : data.name,
  //   lastName : data.lastName,
  //   carNumber : data.carNumber
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
  // };
  useEffect(() => {
    GetCustomerByPhoneNumber(state.phoneNumber).then((response) => {
      setcustomerinfo(response.data.data);
      setfirstload(true);
    });
  }, []);

  // useEffect(() => {
  //   if (!!customerinfo.id) {
  //     setfirstload(true);
  //   }
  // }, [customerinfo]);

  return (
    <>
      {!!firstload ? (
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
          <div className=" h-[80%] flex flex-col gap-3 justify-center">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col  gap-3 items-center text-center  ">
                {/* <div className="flex flex-col items-center ">
                  header
                  <img src="../images/Login.png" alt="" />
                  <img src="../images/home_coffee_heading1.png" alt="" />
                </div> */}
                <div className="mt-6 px-3 sm:px-0">
                  <h2 className="text-base font-semibold text-[#652D0D]">
                    اطلاعات کاربری
                  </h2>
                  <h3 className="text-[14px] font-semibold mt-3 mb-5 text-[#652D0D]">
                    در این بخش شما می توانید، اطلاعات خود را وارد کنید
                  </h3>
                </div>
                <div className="flex gap-3 px-3  md:w-[45%] justify-between ">
                  <div className="sm:w-full md:w-[45%]">
                    <TextField
                      inputProps={{
                        style: { height: "19px", fontSize: "14px" },
                      }}
                      sx={ariaLabel}
                      size="small"
                      className="w-[100%]"
                      // style={{ width: 200 }}
                      label="نام"
                      onChange={changeHandler}
                      value={customerinfo.name}
                      name="name"
                      id="outlined-basic"
                      type="text"
                      variant="outlined"
                    />
                  </div>
                  <div className=" md:w-[45%]">
                    <div>
                      <TextField
                        inputProps={{
                          style: { height: "19px", fontSize: "14px" },
                        }}
                        sx={ariaLabel}
                        size="small"
                        // style={{ width: 450 }}
                        className="sm:w-[100%]"
                        label="شماره همراه"
                        onChange={changeHandler}
                        value={customerinfo.phoneNumber}
                        name="phoneNumber"
                        id="outlined-basic"
                        type="number"
                        variant="outlined"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[45%] sm-w-[45%] ">
                  <TextField
                    inputProps={{
                      style: { height: "19px", fontSize: "14px" },
                    }}
                    sx={ariaLabel}
                    size="small"
                    style={{ width: "100%" }}
                    className="w-11/12 sm:w-[450px]"
                    label="آدرس"
                    onChange={changeHandler}
                    value={customerinfo.address}
                    name="address"
                    id="outlined-basic"
                    type="text"
                    variant="outlined"
                  />
                </div>

                <div className="mt-6 flex w-[50%] sm:w-auto justify-between sm:justify-start">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "ON_LOGIN" })}
                    className="text-[12px] sm:text-[14px] py-1 font-medium rounded-sm w-[30%] sm:w-[118px] border border-[#652D0D] text-[#652D0D] ml-7 sm:ml-14 hover:text-[#f1f1f1] hover:bg-[#652d0d] duration-300 transition-all"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    className="text-[12px]  sm:text-[14px] py-1 font-medium rounded-sm w-[60%] sm:w-[261px] border border-[#652D0D] text-[#f1f1f1] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#f1f1f1] duration-300 transition-all"
                  >
                    تـاییـد و ادامـه
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) : null}
    </>
  );
};

export default SignUp;
// function useeffect(arg0: () => void) {
//   throw new Error("Function not implemented.");
// }
