import { useEffect, useState } from "react";
import Panel_title from "../panel_title/Panel_title";
import { GetProductGroup } from "@/Dataservice/DashbordProvider";
import Inventory_control_table from "./inventory_control_table";
import Inventory_control_btn from "./inventory_control_btn";
import { notify } from "@/helpers/toust";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface initialStateType {
  id: number;
  name: String;
}

function Inventory_control() {
  const [firstload, setfirstload] = useState(false);
  const [state, setstate] = useState<initialStateType[]>([]);
  const [postdata, setpostdata] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        await GetProductGroup().then((Response) => {
          setstate(Response.data.dataList);
        });
      } catch (error) {
        notify("err", "! خطا، لطفا بار دیگر تلاش کنید");
      }
    };
    fetch();
    setfirstload(true);
  }, []);

  return (
    <>
      {!!firstload ? (
        <div className="bg-none flex flex-col items-center w-[97%] h-screen gap-3 pb-3">
          <div className="h-[10%] w-[100%]">
            <Panel_title name={"کنترل موجودی"} />
          </div>
          <div className="h-[90%] w-[100%] flex flex-col ">
            <div className="max-h-[90%]">
              <Inventory_control_table
                state={state}
                setpostdata={setpostdata}
              />
            </div>
            <div className="h-[10%] flex flex-col justify-center">
              <Inventory_control_btn postdata={postdata} />
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : null}
    </>
  );
}

export default Inventory_control;
