import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getOrdersByPhoneNumber } from "@/Dataservice/orderhistoryProvider";
import { Cookie } from "@next/font/google";
import Cookies from "js-cookie";
import Orderhistormodal from "./Orderhistorymodal";
import axiosinstance from "@/Dataservice/Configs/axiosInstance";
////////////////////////////
interface alldatatype {
  customerName: string;
  address: string;
  orderId: number;
  number: string;
  desciription: string;
  price: number;
  status: string;
}
interface alldatalist {
  data: Array<alldatatype>;
}
const Data = {
  data: [
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
    {
      number: "1232122",
      status: "تکمیل شده",
      customerName: "alireza",
      address: "asas asas asas asasa sas0 ",
      orderId: 12321,
      desciription: "sdd sdsa  dsdsas",
      price: 12323233,
    },
  ],
};
////////////////////////////

function Order_history() {
  const [firstload, setfirstload] = useState(false);
  //   const [alldata, setalldata] = useState<alldatalist>({} as alldatalist);
  //   const [alldata, setalldata] = useState<alldatalist>(Data);
  const [alldata, setalldata] = useState(Data);
  //   const [alldata, setalldata] = useState(Data);
  const [allOrder, setAllOrder] = useState<any>([]);

  ///////////////////////////
  useEffect(() => {
    // const pn = Cookies.get("phonenumber");
    // getOrdersByPhoneNumber(pn).then((Response) => {
    //   setalldata(Response.data.dataList);
    // });
    const getAllorders = async () => {
      const getAllOrder = await axiosinstance.get(
        "http://etokco.ir/PosOrder/getAllOrders"
      );
      setAllOrder(getAllOrder.data.dataList);
    };
    getAllorders();
    setfirstload(true);
  }, []);

  return (
    <>
      <div className="for_app h-screen flex flex-col gap-20">
        <div className="w-full h-[35%]">
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
        <div className=" h-[80%] flex flex-col items-center justify-center">
          <div className="h-[15%] sm:mt-7 w-full gap-1 flex flex-col justify-center items-center">
            <p className="text-[#652D0D]">پیگیری سفارش ها</p>
            <img src="../images/home_coffee_heading1.png" alt="" />
          </div>
          <div className="h-[10%] w-full justify-center"></div>
          <div className="h-[75%] overflow-scroll w-full  ">
            {/* {!!firstload && !!alldata
              ? alldata.data.map((item: any) => (
                  <div className="h-[20%] w-[80%] border-2 mx-auto px-2 flex items-center justify-between ">
                    <div className="text-[#652D0D]">سفارش {item.number}</div>
                    <div className="flex w-[40%] justify-between items-center px-2">
                      <div className="py-2 px-3 bg-[#E0C9AC] rounded-sm">
                        {item.status}
                      </div>
                      <div className="cursor-pointer">
                        <Orderhistormodal
                          id={item.orderId}
                          number={item.number}
                          status={item.status}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : null} */}
            {!!firstload && !!allOrder
              ? allOrder.map((item: any, index: any) => (
                  <div className="h-[20%] w-[96%] sm:w-[80%] border-2 mx-auto px-2 sm:px-2 text-[13px] sm:text-base flex items-center justify-between ">
                    <div className="w-[20%] sm:w-[45%]  text-[#652D0D] ">
                      سفارش
                      {/* {item.orderId} */}
                      <span className="mr-1"> {index + 1}</span>
                    </div>
                    <div className="flex w-[80%] sm:w-[55%] justify-between items-center px-2">
                      <div className="w-[90px] sm:w-[110px] text-[13px] sm:text-base  py-1 px-2 bg-[#E0C9AC] rounded-md text-center">
                        {item.status === null && "نامشخص"}
                        {item.status === "Completed" && "تکمیل شده"}
                        {item.status === "Cancelled" && "کنسل شده"}
                        {item.status === "Pending" && "در حال اجرا"}
                      </div>
                      <div className="cursor-pointer">
                        <Orderhistormodal
                          id={item.orderId}
                          number={item.number}
                          status={item.status}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Order_history;
