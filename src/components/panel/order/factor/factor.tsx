import { getOrdersItems } from "@/Dataservice/DashbordProvider";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { ChangeOrderStatus } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helpers/toust";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
interface item {
  quantity: number;
  price: Number;
  comment: String;
  productName: String;
}

interface listitem extends Array<item> {}
function Factor(props: any) {
  const { selectitem, setreload, setselectitem, reload } = props;
  const [items, setitems] = useState<listitem>([]);
  const [firstload, setfirstload] = useState(false);
  useEffect(() => {
    if (!!selectitem.orderId) {
      try {
        getOrdersItems(selectitem.orderId).then((Response) => {
          setitems(Response.data.dataList);
        });
      } catch (error) {
        notify("err", "! خطا، لطفا بار دیگر تلاش کنید");
      }
    }
  }, [selectitem]);
  useEffect(() => {
    if (!!items) {
      setfirstload(true);
    }
  });

  let val;
  const finalprice = () => {
    let val;
    items.map((item: any) => (val = item.price * item.quantity));
    return val;
  };
  const changeorderStatus = (val: any) => {
    let tmp: any;
    if (selectitem.staus == "Cancelled" || "Completed" || "pending")
      val == "Cancelled" ? (tmp = "Cancelled") : (tmp = "Completed");
    const data = {
      orderId: selectitem.orderId,
      isCancelled: val,
    };
    try {
      ChangeOrderStatus(data)
        .then((response) => {
          setreload(!reload);
          if (!!tmp) {
            setselectitem({ ...ChangeOrderStatus, ["status"]: `${tmp}` });
          }
        })
        .catch((err) => {
        });
    } catch (error) {
      notify("err", "! خطا، لطفا بار دیگر تلاش کنید");
    }
  };
  const findstatus = (val: any) => {
    switch (val) {
      case "pending":
        return "انتظار";
      case "Completed":
        return "کامل";
      case "Cancelled":
        return "لغو";

      default:
        return "نامشخص";
    }
  };
  return (
    <>
      {!!firstload ? (
        <div className="w-[40%] max-h-max border-2 rounded-xl border-[#652D0D] flex flex-col gap-3 p-3">
          <div className="flex justify-between ">
            <div></div>
            <div></div>
            <div>
              <p className="px-4 py-1 border-2 border-[#9f79629c] rounded-xl rou">
                {findstatus(selectitem.status)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <p>نام و نام خانوادگی:</p>
            <p>{selectitem.customerName}</p>
          </div>
          <div className="flex gap-2">
            <p>نوع دریافت سفارش:</p>
            <p>{selectitem.desciription}</p>
          </div>
          <div className="flex gap-2">
            <p>آدرس:</p>
            <p>{selectitem.address}</p>
          </div>
          <Divider orientation="horizontal" variant="middle" flexItem />
          <div>
            <p>سفارشات</p>
          </div>
          {items.map((item: any) => (
            <div className="h-3/6 overflow-scroll px-2">
              <div className="flex flex-col ">
                <div className="flex gap-20 ">
                  <p>{item.productName}</p>
                  <p>{item.quantity} عدد</p>
                </div>
                <div>
                  <div className=" flex justify-between  ">
                    <p className="font-light text-xs">{item.comment}</p>
                    <p>
                      {item.price}*{item.quantity}={item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <Divider orientation="horizontal" variant="middle" flexItem />
            </div>
          ))}

          <div className="flex justify-between border-2 border-[#652D0D] rounded-xl py-1 px-2">
            <p>مجموع کل قیمت</p>
            <p>{finalprice()} تومان</p>
          </div>
          <div className="flex justify-around">
            <button
              onClick={() => {
                changeorderStatus(false);
              }}
              className="bg-[#652D0D] rounded-xl py-1 px-6"
            >
              تکمیل کردن
            </button>
            <button
              onClick={() => {
                changeorderStatus(true);
              }}
              className="bg-[#E0C9AC]  rounded-xl py-1 px-6"
            >
              لغو کردن
            </button>
          </div>
          <ToastContainer />
        </div>
      ) : null}
    </>
  );
}

export default Factor;
