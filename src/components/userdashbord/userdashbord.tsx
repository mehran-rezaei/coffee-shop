import { Button, TextField } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useEffect, useState } from "react";
import {
  GetCustomerByPhoneNumber,
  EditCustomerByPhoneNumber,
} from "@/Dataservice/UserdashbordProvider";
import Cookies from "js-cookie";
import { notify } from "../../helpers/toust";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../Menu/Menu";
interface customerinfo {
  id: Number;
  code: string;
  name: string;
  address: string;
  phoneNumber: string;
  isEnabled: boolean;
  isCustomer: boolean;
}
const CssTextField = {
  "& label.Mui-focused": {
    color: "#652D0D",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#652D0D",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#652D0D",
    },
    "&:hover fieldset": {
      borderColor: "#652D0D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#652D0D",
    },
  },
};

function User_dashbord() {
  const [firstload, setfirstload] = useState(false);
  const [response, setresponse] = useState();
  const [customerinfo, setcustomerinfo] = useState<customerinfo>(
    {} as customerinfo
  );
  useEffect(() => {
    const pn = Cookies.get("phonenumber");
    GetCustomerByPhoneNumber(pn).then((Response) => {
      setcustomerinfo(Response.data.data);
      setfirstload(true);
    });
  }, []);
  const submitEdit = () => {
    try {

      EditCustomerByPhoneNumber(customerinfo).then((Response) => {
        setresponse(Response.data.isSuccess);
      });
    } catch (error) {
      notify("err", "خطا هنگام ثبت تغیرات");
    }
  };
  useEffect(() => {
    if (!!response) {
      if (response) notify("success", "تغیرات با موفقیت ثبت شد");
      else notify("err", "خطا هنگام ثبت تغیرات");
    }
  }, [response]);
  return (
    <>
      {!!firstload ? (
        <div className="for_app1">
          <div className="flex justify-between items-center w-full  h-fit   absolute  md:py-0 px-8 top-[1%] ">
            <div className="menu_icon">
              <Menu />
            </div>
            <div className="w-[100px] h-[80px]  md:w-[150px] md:h-[90] lg:h-[80] lg:w-[150px]  flex justify-center items-center">
              <img
                className="w-full h-auto"
                src="../../../images/1.png"
                alt=""
              />
            </div>
            <div></div>
          </div>
          <img
            className="w-full h-[265px]"
            src="../../../images/BACK.png"
            alt="images"
          />
          <div className=" flex flex-col justify-center  items-center w-full h-[10vh]">
            <div className="w-[10%] h-full flex flex-col justify-center gap-2">
              <p className="text-[#652D0D] w-full text-2xl text-center">
                پروفایل
              </p>
              <img
                className="w-full h-auto"
                src="../../../images/home_coffee_heading1.png"
                alt=""
              />
            </div>
          </div>
          <div className=" flex flex-col justify-center  items-center w-full h-[10vh]">
            <p className="text-[#652D0D] w-full text-xl text-center">
              در این بخش شما می توانید اطلاعات کاربری خود را وارد و یا ویرایش
              کنید
            </p>
          </div>
          <div className=" flex   justify-center  items-center w-full h-[10vh]">
            <div className="  flex gap-6 justify-between  items-center w-2/5 h-[10vh]">
              {" "}
              <div className="w-2/4">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={CssTextField}
                  // disabled={row.isLimited}
                  size="small"
                  value={customerinfo.name}
                  onChange={(event) =>
                    setcustomerinfo({
                      ...customerinfo,
                      ["name"]: event.target.value,
                    })
                  }
                  id="outlined-basic"
                  label="نام"
                  variant="outlined"
                />{" "}
              </div>
              <div className="w-2/4">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={CssTextField}
                  // disabled={row.isLimited}
                  size="small"
                  value={customerinfo.address}
                  onChange={(event) =>
                    setcustomerinfo({
                      ...customerinfo,
                      ["address"]: event.target.value,
                    })
                  }
                  id="outlined-basic"
                  label="آدرس"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          {/* <div className=" flex   justify-center  items-center w-full h-[10vh]">
            <div className=" flex  justify-center  items-center w-2/5 h-[10vh]">
              <TextField
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                fullWidth
                sx={CssTextField}
                // disabled={row.isLimited}

                size="small"
                // value={row.quantity}
                // onChange={(event) => handleInputChange(event, index)}
                id="outlined-basic"
                label="نام"
                variant="outlined"
              />{" "}
            </div>
          </div> */}
          {/* <div className=" flex   justify-center  items-center w-full h-[10vh]"> */}
          {/* <div className="  flex gap-6 justify-between  items-center w-2/5 h-[10vh]"> */}{" "}
          {/* <div className="w-2/4">
                <TextField
                  fullWidth
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={CssTextField}
                  // disabled={row.isLimited}
                  size="small"
                  // value={row.quantity}
                  // onChange={(event) => handleInputChange(event, index)}
                  id="outlined-basic"
                  label="پلاک خودرو"
                  variant="outlined"
                />{" "}
              </div> */}
          {/* <div className="w-2/4">
                {" "}
                <TextField
                  fullWidth
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={CssTextField}
                  // disabled={row.isLimited}
                  size="small"
                  // value={row.quantity}
                  // onChange={(event) => handleInputChange(event, index)}
                  id="outlined-basic"
                  label="مدل خودرو"
                  variant="outlined"
                />
              </div> */}
          {/* </div> */}
          {/* </div> */}
          <div className=" flex   justify-center  items-center w-full h-[10vh]">
            <div className="  flex gap-6 justify-end  items-center w-2/5 h-[10vh]">
              <Button
                onClick={submitEdit}
                sx={{
                  bgcolor: "#652D0D",
                  ":hover": {
                    bgcolor: "#652d0dd1", // theme.palette.primary.main
                    color: "white",
                  },
                }}
                // onClick={handleSubmitGroup}

                variant="contained"
              >
                ذخیره تغیرات
              </Button>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : null}
    </>
  );
}

export default User_dashbord;
