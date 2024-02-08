import { useState, useContext ,useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Login } from "@mui/icons-material";
// import MenuRequest from "../../Dataservice/HomeProvider";
import { MenuRequest } from "../Dataservice/HomeProvider";

const BackColor = () => {
let menulist:any = [];
    useEffect(() => {
        const Fetchdata = async () => {
          try {
            menulist = await MenuRequest();
          } catch (error) {
            //Log errors
          }
        };
      }, []);
    return (
        <>
        {!!menulist ? (
          <div className="menu_con ">
            <div className="menulist_con">
              <Grid container spacing={2}>
                {menulist.map((item:any) => (
                  <Grid xs={4}>
                    <div value={item.id} onClick={() => {}} className="menu_item">
                      {item.name}
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        ) : null}
      </>
    );
};

export default BackColor;




