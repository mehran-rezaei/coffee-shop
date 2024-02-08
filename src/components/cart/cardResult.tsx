import React, { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { CartContext } from "@/context/cartContextProvider";
import axiosinstance from "@/Dataservice/Configs/axiosInstance";
import Link from "next/link";
import { notify } from "@/helpers/toust";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const CardResult = () => {
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
  const { state2, dispatch2 } = useContext<any>(CartContext);

  //   const sendSale = async() => {
  //     const addSale = await axiosinstance.post(``)
  // }
  const sendSale = () => {
    if (true) {
      // notify("success", "سفارش شما با موفقیت ثبت شد");
      // @ts-ignore
      const items = JSON.parse(localStorage.getItem("dataKey"));
      const checkvalid = Cookies.get("token");
      if (!!checkvalid) {
        if (!!items) {
          if (items.length > 0) {
            setTimeout(() => {
              router.push("/confirmorder");
            }, 500);
          } else {
            notify("err", "سبد خرید خالی است");
          }
        } else {
          notify("err", "سبد خرید خالی است");
        }
      } else {
        notify("err", "لطفا ابتدا وارد شوید");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
      // dispatch2({ type: "CHECKOUT" });
    }
  };
  const totalprice = () => {
    let total = 0;
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("dataKey"));
    if (!!items) {
      items.map((item: any) => (total = total + item.price));
    }
    return total;
  };
  // useEffect(() => {}, []);

  return (
    <div className="w-[370px] py-3  h-[105px] fixed bottom-0 bg-[#E0C9AC] rounded-md">
      <form>
        <div>
          <h2 className="text-center text-[#652D0D] pl-6 pb-2 sm:pb-1 text-[17px] font-medium mb-3">
            <span>جمع قیمت : </span>

            <span>{totalprice()}</span>
            <span>تومان </span>
          </h2>
          {/* <div className="flex flex-col ">
            <TextField
              style={{ marginBottom: "10px" }}
              inputProps={{ style: { height: "19px", fontSize: "14px" } }}
              sx={ariaLabel}
              size="small"
              className="w-[250px] sm:w-[300px]  "
              // style={{ width: 200 }}
              label="شماره میز"
              // onChange={changeHandler}
              // value={data.name}
              name="name"
              id="outlined-basic"
              type="text"
              variant="outlined"
            />
            <TextField
              inputProps={{ style: { height: "34px", fontSize: "14px" } }}
              sx={ariaLabel}
              size="small"
              className="w-[250px] sm:w-[300px] "
              // style={{ width: 450 }}
              label="توضیحات"
              // onChange={changeHandler}
              // value={data.description}
              name="description"
              id="outlined-basic"
              type="text"
              variant="outlined"
            />
          </div> */}

          <div className="flex justify-between px-6    mt-1 sm:mt-1 ">
            <Link href="/">
              <button
                type="button"
                className="text-[13px] sm:text-[14px] py-1  px-2 font-medium rounded-sm w-[100%] sm:w-[100px] border border-[#652D0D] text-[#652D0D] bg-[#E0C9AC] hover:text-[#E0C9AC] hover:bg-[#652d0d] duration-200 ease-in transition-all"
              >
                بازگشت به منو
              </button>
            </Link>
            <button
              type="button"
              onClick={sendSale}
              className="text-[13px] sm:text-[14px] py-1 font-medium rounded-sm w-[50%] sm:w-[180px] border border-[#652D0D] text-[#E0C9AC] bg-[#652D0D] hover:text-[#652d0d] hover:bg-[#E0C9AC] duration-200 ease-in transition-all"
            >
              ثبت سفارش
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CardResult;
