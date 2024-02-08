import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
} from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { notify } from "@/helpers/toust";
import { ToastContainer } from "react-toastify";
import Orderhistormodal from "../orderhistory/Orderhistorymodal";
import { AddSaleDocument } from "@/Dataservice/cartProvider";
import axios from "axios";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
interface postdatatype {
  number: string;
  customerId: number;
  paidStatus: number;
  desciription: string;
  saleType: number;
  address: string;
  carModelAndColor: string;
  tableNumber: string;
  carNumber: string;
  documentItems: Array<arrayoption>;
}
interface arrayoption {
  productId: number;
  quantity: number;
  optionsId: Array<option>;
}
interface option {
  id: number;
}
const initdata = {
  number: "",
  customerId: 0,
  paidStatus: 0,
  desciription: "",
  saleType: 1,
  address: "",
  carModelAndColor: "",
  tableNumber: "",
  carNumber: "",
  documentItems: [{} as arrayoption],
};
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

function Confirm_order() {
  const router = useRouter();
  const [selectop, setselectop] = useState<Number>(1);
  const [data, setdata] = useState<postdatatype>(initdata);
  const [label, setlabel] = useState("شماره میز");
  const [checked, setChecked] = useState([true, false, false]);
  const handleChecked = (number: any) => {
    if (number == 1) {
      setselectop(1);
      setChecked([true, false, false]);
      setlabel("شماره میز");
      setdata({ ...data, ["saleType"]: 1 });
    }
    if (number == 2) {
      setselectop(2);
      setChecked([false, true, false]);
      setlabel("آدرس");
      setdata({ ...data, ["saleType"]: 2 });
    }
    if (number == 3) {
      setselectop(3);
      setChecked([false, false, true]);
      setlabel("شماره پلاک");
      setdata({ ...data, ["saleType"]: 3 });
    }
  };
  const handleSubmit = async () => {
    let postdata = data;
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("dataKey"));
    if (!!items) {
      items.map((item: any, index: number) => delete item.productOptions);
    }
    postdata.documentItems = items;
   

    try {
      // const token = Cookies.get("token");
      // axios
      //   .post(
      //     "http://etokco.ir/api/v2/Document/AddSaleDocumentForRestaurant",
      //     postdata,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //   });
      AddSaleDocument(postdata).then((response) => {
      });
      notify("success", "سفارش شما با موفقیت ثبت شد");
      setTimeout(() => {
        router.push("/");
      }, 3000);
      localStorage.clear();
    } catch (error) {
      notify("err", "عملیات ثبت سفارش با خطا مواجه شد بار دیگر تلاش بکنید");
    }
  };

  return (
    <>
      <div className="for_app h-screen flex flex-col gap-20">
        <div className="w-full h-[35%]">
          <div className="Hero_con1 w-100 h-[100%]"></div>
          <div className="absolute left-0 w-full top-[10%] flex justify-center h-[25vh] ">
            <div className="w-2/3 md:w-2/4 lg:w-1/3 h-auto relative ">
              <img
                className="w-full h-auto"
                src="../images/3.png"
                alt="images"
              />
            </div>
          </div>
        </div>
        <div className=" h-[80%] flex flex-col items-center justify-center gap-3">
          <div>
            <p>در این بخش شما می توانید، اطلاعات خود را وارد کنید</p>
          </div>
          <div className="flex w-[100%] px-1  md:w-[40%] justify-around ">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[0]}
                  onClick={() => handleChecked(1)}
                />
              }
              label="داخل کافه"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[1]}
                  onClick={() => handleChecked(2)}
                />
              }
              label="پیک"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[2]}
                  onClick={() => handleChecked(3)}
                />
              }
              label="بیرون بر"
            />
          </div>
          <div className=" flex-col flex sm:flex-row   sm:w-[40%] gap-3 justify-around ">
            <TextField
              required
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
              value={
                data.saleType == 1
                  ? data.tableNumber
                  : data.saleType == 2
                  ? data.address
                  : data.carNumber
              }
              onChange={(event) =>
                data.saleType == 1
                  ? setdata({
                      ...data,
                      ["tableNumber"]: (event.target.value),
                    })
                  : data.saleType == 2
                  ? setdata({
                      ...data,
                      ["address"]: event.target.value,
                    })
                  : setdata({
                      ...data,
                      ["carNumber"]: event.target.value,
                    })
              }
              id="outlined-basic"
              label={label}
              variant="outlined"
            />
            {data.saleType == 3 ? (
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
                //  disabled={row.isLimited}
                size="small"
                value={data.carModelAndColor}
                onChange={(event) =>
                  setdata({
                    ...data,
                    ["carModelAndColor"]: event.target.value,
                  })
                }
                id="outlined-basic"
                label="رنگ و مدل ماشین"
                variant="outlined"
              />
            ) : null}
          </div>
          <div className="flex w-[80%] px-1 md:px-0  md:w-[40%]  justify-around ">
            <textarea
              className="border-1 border-[#652D0D]"
              id="w3review"
              name="w3review"
              rows={4}
              cols={75}
              value={data.desciription}
              onChange={(event) => {
                setdata({ ...data, ["desciription"]: event.target.value });
              }}
              placeholder={"توضیحات"}
            ></textarea>
          </div>
          <div className="flex justify-around h-fit  w-[100%] px-1  md:w-[40%]">
            <Button
              sx={{
                bgcolor: "#652D0D",
                ":hover": {
                  bgcolor: "#652d0dd1", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={() => {
                router.push("/card");
              }}
              variant="contained"
            >
              بازگشت
            </Button>
            <Button
              sx={{
                bgcolor: "#652D0D",
                ":hover": {
                  bgcolor: "#652d0dd1", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={() => {
                handleSubmit();
              }}
              variant="contained"
            >
              تـاییـد و ادامـه
            </Button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Confirm_order;
