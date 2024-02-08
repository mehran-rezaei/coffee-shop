// import Header from "../header/header";
import dynamic from "next/dynamic";
// const Header = dynamic(() => import('../header/header'), {
//   ssr: false,
// })
import Header from "../header/header";
function Hero(props: any) {
  return (
    <>
      <div className="h-fit">
        <Header  setforeload={props.setforeload} foreload={props.forload}/>
        <img
          className="w-full h-auto"
          src="../../../images/f1.png"
          alt="images"
        />
      </div>
    </>
  );
}

export default Hero;
