import DehazeIcon from "@mui/icons-material/Dehaze";
function User_panel() {
  return (
    <>
      <div className="for_app_1">
        <div className=" flex justify-between items-center w-full  h-fit   absolute  md:py-0 px-8 top-[1%] ">
          <div className="menu_icon">
            <DehazeIcon fontSize="large" />
          </div>
          <div className="w-[100px] h-[60]  md:w-[150px] md:h-[90] lg:h-[120] lg:w-[200px]  flex justify-center items-center">
            <img className="w-full h-auto" src="../../../images/1.png" alt="" />
          </div>
          <div></div>
        </div>
        
      </div>
    </>
  );
}

export default User_panel;
