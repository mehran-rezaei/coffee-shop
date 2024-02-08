import React, { useEffect, useState, useContext } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Link from "next/link";
import Menu from "@/components/Menu/Menu";
import { CartContext } from "@/context/cartContextProvider";
import Cookies from "js-cookie";
import { Badge, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Header(props: any) {
  ///////////
  const [firstloading, setfirstloading] = useState(false);
  const [State, setState] = useState(0);
  const [headerColor, setHeaderColor] = useState("");

  //////////////////////////////////////////////////////////
  const listenScrollEvent = () => {
    // window.scrollY > 10 ? setHeaderColor("#f1f2f6") : setHeaderColor("");
    window.scrollY > 10 ? setHeaderColor("rgba(245,245,245,0.99)") : setHeaderColor("");

  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  });
  //////////////////////////////////////////////////////////

  let ItemsCounter = 0;
  useEffect(() => {
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("dataKey"));
    if (!!items) {
      items.map((val: any) => (ItemsCounter = ItemsCounter + val.quantity));
      setState(ItemsCounter);
    }
    if (firstloading != true) {
      setfirstloading(true);
    }
    props.setforeload(props.foreload);
  });
  const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      color: "white",
      backgroundColor: "#652D0D",
    },
  });
  ///////////
  const { state2, dispatch2 } = useContext<any>(CartContext);
  return (
    <>
      {!!firstloading ? (
        <div
          style={{ backgroundColor: headerColor }}
          className="flex justify-between items-center w-full  h-fit z-10  fixed  md:py-0 pr-3 pl-5 sm:px-8 top-0 "
        >
          <Menu />
          <div className="w-[100px] h-[60]  md:w-[150px] md:h-[90] lg:h-[120] lg:w-[200px]  flex justify-center items-center">
            <img className="w-full h-auto" src="../../../images/1.png" alt="" />
          </div>
          <Link href="/card">
            <div className="flex items-center ">
              {State != 0 ? (
                // <div className="text-[14px]   bg-[#652D0D] text-white px-[10px] py-[4px] rounded-[50%]">
                //   {/* {`${ItemsCounter}`} */}
                //   {State}
                <StyledBadge
                  className="p-1"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  badgeContent={State}
                  sx={{ color: "#652D0D" }}
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              ) : (
                // </div>
                <StyledBadge
                  className="p-1"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{ color: "#652D0D" }}
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              )}
            </div>
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default Header;
