import Header from "./header/header";
import Hero from "./hero/hero";
import Menu_logo from "./menu_logo/menu_logo";
import Menu from "./menu/menu";
import PrGroupSlider from "./slider/prGroupSlider";
import Footer from "./footer/footer";
import { useState } from "react";

function Home_container() {
  const [forload,setforeload]=useState(false)
  return (
    <div className="w-screen for_app ">
      <Hero setforeload={setforeload} foreload={forload}/>
      <Menu />
      <PrGroupSlider setforeload={setforeload} foreload={forload} />
      <Footer />
    </div>
  );
}

export default Home_container;
