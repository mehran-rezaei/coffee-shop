import React, { useEffect, useState, useContext } from "react";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
//context
import { CartContext } from "@/context/cartContextProvider";
///////////////////////////////////////////////////interface
interface data {
  productId: number;
  quantity: number;
  price: number;
  optionsId: Array<number>;
  productName: string;
  productOptions: Array<productOptions>;
}
interface productOptions {
  title: string;
  price: Number;
  id: Number;
}
interface datalist extends Array<data> {}
///////////////////////////////////////////////////
const CartTable = (props: any) => {
  const { setnothing, nothing } = props;
  const { state2, dispatch2 } = useContext<any>(CartContext);
  const [firstload, setfirstload] = useState(false);
  const [data, setdata] = useState<datalist>([]);
  ////////////////////////////////////////////////////////////////////////////////////// increase and decrease
  const handleNumberChangeincrease = (
    itemdata: data,
    quantity: number,
    price: number
  ) => {
    let temp = quantity;
    let tempprice = price;
    temp = temp + 1;
    tempprice = tempprice + tempprice / quantity;
    let tempdata = data;
    let index = data.findIndex((item: any) => item == itemdata);
    tempdata[index] = {
      ...tempdata[index],
      ["price"]: tempprice,
      ["quantity"]: temp,
    };
    setdata(tempdata);
    localStorage.setItem("dataKey", JSON.stringify(data));
    setnothing(!nothing);
  };
  const handleNumberChangedecrease = (
    itemdata: data,
    quantity: number,
    price: number
  ) => {
    let temp = quantity;
    let tempprice = price;
    if (temp != 1) {
      temp = temp - 1;
      tempprice = tempprice - tempprice / quantity;
      let tempdata = data;
      let index = data.findIndex((item: any) => item == itemdata);
      tempdata[index] = {
        ...tempdata[index],
        ["price"]: tempprice,
        ["quantity"]: temp,
      };
      setdata(tempdata);
      localStorage.setItem("dataKey", JSON.stringify(data));
      setnothing(!nothing);
    } else {
      let tempdata = data;
      let Find2 = tempdata.findIndex((x: any) => x === itemdata);
      tempdata.splice(Find2, 1);
      setdata(tempdata);
      localStorage.setItem("dataKey", JSON.stringify(data));
      setnothing(!nothing);
    }
  };
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("dataKey"));
    if (!!items) {
      setdata(items);
    }
  }, []);
  ///////////////////////////////////////////////////////////////////////
  const deleteitem = (item: any) => {
    let tempdata = data;
    let Find2 = tempdata.findIndex((x: any) => x === item);
    tempdata.splice(Find2, 1);
    setdata(tempdata);
    localStorage.setItem("dataKey", JSON.stringify(data));
    setnothing(!nothing);
  };
  //////////////////////////////////////////////////////////////////////
  const findoptionname = (item: number, data: data) => {
    if (!!data.productOptions) {
      let temp = data.productOptions.find((e: productOptions) => e.id == item);
      return temp?.title;
    }
  };
  //////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="flex flex-col gap-4 overflow-x-scroll-scroll w-full h-[55%] items-center">
        {!!data
          ? data.map((item: data) => (
              <div className="w-[90%] h-[10%] sm:w-[50%] ">
                <div className="h-[50%] w-full flex justify-between items-center ">
                  <div className="flex gap-2 w-[40%] justify-start text-[#652D0D] items-center">
                    <svg
                      onClick={() => {
                        deleteitem(item);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <div className="text-2xl">{item.productName}</div>
                  </div>
                  <div className="w-[30%] flex justify-center text-[#652D0D] items-center">
                    {" "}
                    <div className=" h-[30px] rounded-md  w-fit flex items-center rtl  bg-[#652D0D]">
                      <div
                        className="p-1 text-white"
                        onClick={() => {
                          handleNumberChangeincrease(
                            item,
                            item.quantity,
                            item.price
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-5 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                      <div className=" px-2 text-[#652D0D] bg-white">
                        {item.quantity}
                      </div>
                      <div
                        className="p-1 text-white"
                        onClick={() => {
                          handleNumberChangedecrease(
                            item,
                            item.quantity,
                            item.price
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-5 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[30%] justify-end gap-1 text-[#652D0D] items-center">
                    <p>{item.price}</p>
                    <p>تومان</p>
                  </div>
                </div>
                <div className="rtl flex gap-3 text-[#652D0D]">
                  {item.optionsId.map((element: any) => (
                    <div>
                      {findoptionname(element, item)}
                      <div className="w-[1px] h-full bg-[[#652D0D]]"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default CartTable;
