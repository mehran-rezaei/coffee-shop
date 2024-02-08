import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Filter from "./filter/filter";
import Order_table from "./order_table/order_table";
import Factor from "./factor/factor";
import Panel_title from "../panel_title/Panel_title";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/Dataservice/DashbordProvider";
import { notify } from "@/helpers/toust";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
interface initialStateType {
  orderId: Number;
  number: Number;
  desciription: String;
  price: Number;
  status: String;
  address: String;
  customerName: String;
}

function Order() {
  const [firstload, setfirstload] = useState(false);
  const [reload, setreload] = useState(false);
  const [state, setstate] = useState<initialStateType[]>([]);
  const [fillter, setfillter] = useState<number>(0);
  const [selectitem, setselectitem] = useState<initialStateType>(
    {} as initialStateType
  );
  useEffect(() => {
    const fetch = async () => {
      try {
        await getAllOrders().then((Response) => {
          setstate(Response.data.dataList);
        });
      } catch (error) {
        notify("err", "! خطا، لطفا بار دیگر تلاش کنید");
      }
    };
    fetch();
    setfirstload(true);
  }, [reload]);

  return (
    <>
      {!!firstload ? (
        <div className="bg-none flex flex-col w-[100%] items-center h-screen  ">
          <Panel_title name={"سفارشات"} />
          <Filter setfillter={setfillter} />
          <div className="w-[97%] flex h-[70%]  justify-around">
            <Order_table
              state={state}
              selectitem={selectitem}
              setselectitem={setselectitem}
            />
            {!!selectitem.orderId ? (
              <Factor
                setreload={setreload}
                selectitem={selectitem}
                reload={reload}
                setselectitem={setselectitem}
              />
            ) : null}
          </div>

          <ToastContainer />
        </div>
      ) : null}
    </>
  );
}

export default Order;
