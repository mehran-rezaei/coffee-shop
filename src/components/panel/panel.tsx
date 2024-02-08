import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Sidbar from "./sidebar/sidebar";
import Inventory_control from "./inventory_control/inventory_control";
import Order from "./order/order";
import Report from "./report_panel/report";
import { useState } from "react";

function Panel() {
  const [btn, setbtn] = useState<Number>(0);

  const ActiveConponent = () => {
    if (btn == 1 || btn == 0) {
      return <Inventory_control />;
    }
    if (btn == 2) {
      return <Order />;
    }
    if (btn == 3) {
      return <Report />;
    }
  };
  return (
    <div className=" w-full h-screen">
      <Grid container className="h-screen">
        <Grid xs={2} className="bg-[#E0C9AC]">
          <Sidbar setbtn={setbtn} />
        </Grid>

        <Grid id={"rtl_side"} xs={10}>
          <div className="flex justify-center">{ActiveConponent()}</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Panel;
