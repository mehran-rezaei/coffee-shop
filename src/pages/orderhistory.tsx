import { useState } from "react";
import Header from "@/components/home/header/header";
import Order_history from "@/components/orderhistory/Orderhistory";
import { ToastContainer } from "react-toastify";
function Orderhistory() {
  const [forload , setforeload] = useState(true)
  return (
    <>
    <Header setforeload={setforeload} foreload={forload} />
    <Order_history/>
    </>
  );
}

export default Orderhistory;
