import { Box, Button, Modal } from "@mui/material";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect, useState } from "react";
import { getOrdersItems } from "@/Dataservice/orderhistoryProvider";
import axiosinstance from "@/Dataservice/Configs/axiosInstance";

interface datatype {
  quantity: number;
  price: number;
  comment: string;
  productName: string;
}
interface datalist {
  data: Array<datatype>;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Orderhistormodal(props: any) {
  const { number, id } = props;
  const [data, setdata] = useState<datalist>({} as datalist);
  const [Firstload, setFirstload] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Order, setOrder] = useState<any>("");

  ///////////////////////
  useEffect(() => {
    //   if (!!open) {
    //     getOrdersItems(id).then((Response) => {
    //       setdata(Response.data.dataList);
    //     });
    // }
    const getOrders = async () => {
      const getOrderss = await axiosinstance.get(
        `http://etokco.ir/PosOrder/getOrdersItems?Id=${id}`
      );
      setOrder(getOrderss.data.dataList);
    };
    getOrders();
  }, []);
  return (
    <>
      <div className="menu_icon">
        <Button onClick={handleOpen}>
          <div className="text-[#652D0D] sm:text-base text-[13px]">
            مشاهده جزییات
          </div>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <div
            id="rtl_side"
            className="w-[70%] md:w-[50%] 2xl:w-[40%]  h-full flex justify-center absolute top-[50%] left-[50%] items-center flex-col p-5"
          >
            <div className="w-[90%] h-[10%]  flex items-center justify-end">
              <svg
                className="w-16 h-16 text-[#652D0D] cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div> */}
          <>
            <div
              className="bg-white pt-8 w-[300px] rounded-lg sm:w-[600px] "
              style={{ ...style, height: "80vh", borderRadius: "5" }}
            >
              <div className="w-full h-full flex items-center pt-3   flex-col ">
                {/* <div>  شماره</div> */}
                <div className="mt-2 rtl">سفارش {props.number}</div>
                <div className="px-8 py-0.5 mt-5 bg-[#652D0D] text-[#E0C9AC] rounded-md ">
                  {/* {props.status} */}
                  {props.status === null && "نا مشخص"}
                  {props.status === "Completed" && "تکمیل شده"}
                  {props.status === "Cancelled" && "کنسل شده"}
                  {props.status === "Pending" && "در حال اجرا"}
                </div>
                <div className="flex justify-center items-center">
                  <p className="mt-6 text-right w-[240px] mb-2  sm:w-[550px] text-[#652D0D]">
                    سفارشات
                  </p>
                  {/* {!!Firstload
                      ? data.data.map((item: datatype) => (
                          <div className="w-full flex flex-col">
                            <div className="w-full flex justify-between items-center">
                              <div className="flex gap-2">
                                <div>{item.productName}</div>
                                <div>{item.quantity}</div>
                              </div>
                              <div>{item.price}</div>
                            </div>
                            <div>{item.comment}</div>
                          </div>
                        ))
                      : null} */}
                </div>
                {Order &&
                  Order.map((Oneorder: any) => (
                    <div className="flex rtl w-[100%] px-6 border-t pt-2 justify-between">
                      <div className="flex flex-col">
                        <span>{Oneorder.productName}</span>
                        {/* <span className="text-[12px]">{Oneorder.comment} </span> */}
                        {/* <span className="text-[12px] sm:text-[14px]">{'water +5'} </span> */}
                      </div>
                      <div>
                        {Oneorder.quantity}
                        <span className="mr-0.5"> عدد</span>
                      </div>
                      <div>
                        {Oneorder.price}
                        <span className="mr-0.5"> تومن</span>
                      </div>
                    </div>
                  ))}
              </div>

              <div
                onClick={() => handleClose()}
                className="cursor-pointer absolute top-4 sm:top-5 left-4 sm:left-5 "
              >
                بستن
              </div>
            </div>
          </>
        </Modal>
      </div>
    </>
  );
}

export default Orderhistormodal;
