import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Report_card from "./report_card";
interface dataType {
  todaySale: number;
  lastWeekSale: number;
  lastMonthSale: number;
}
function Report_con() {
  const [data, setdata] = useState<dataType>({} as dataType);
  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://etokco.ir/Report/GetDailyWeekilyMonthlyIncomeReport", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      })
      .then((response) => {
        setdata(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="w-full h-[35vh] flex justify-around border-2 items-center rounded-2xl border-[#652D0D]">
        <Report_card data={data.todaySale} name={"فروش روزانه"} />
        <Report_card data={data.lastWeekSale} name={"فروش هفتگی"} />
        <Report_card data={data.lastMonthSale} name={"فروش ماهانه"} />
      </div>
    </>
  );
}

export default Report_con;
