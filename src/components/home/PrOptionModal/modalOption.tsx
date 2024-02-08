import React, { useEffect, useState, useContext } from "react";
import {
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { GetOptionsOfProduct } from "@/Dataservice/HomeProvider";
import { Button } from "@mui/material";
//////////////////////////////////////////////////////////////////////////////////////////interface
//////////////////////////////interface option
interface optionitem {
  id: Number;
  title: string;
  salePrice: Number;
  productId: Number;
  productName: string;
  uniqueId: string;
}
interface optionlist extends Array<optionitem> {}
/////////////////////////////interface data
interface data {
  productId: number;
  quantity: number;
  price: number;
  optionsId: Array<number>;
  productName: string;
  productOptions: Array<productOptions>;
}
interface productOptions {
  title: string;
  price: Number;
}
//////////////////////////////////////////////////////////////////////////////////////////style modal

//////////////////////////////////////////////////////////////////////////////////////////
const modalOption = (props: any) => {
  ////////////////////////////////////////////////////////////////////////////////////////props
  
  const { product, setopenmodal } = props;

  const initdata = {
    productId: product.productId,
    quantity: 1,
    price: product.salePrice,
    optionsId: [],
    productName: product.productName,
    productOptions: product.productOptions,
  };
  ////////////////////////////////////////////////////////////////////////////////////////state
  const [data, setdata] = useState<data>({} as data);
  const [firstdata, setfirstdata] = useState<boolean>(true);

  useEffect(() => {
    console.log(product);
    setdata({
      productId: product.productId,
      quantity: 1,
      price: product.salePrice,
      optionsId: [],
      productName: product.productName,
      productOptions: product.productOptions,
    });
  }, []);

  if (firstdata) {
    console.log(data);
  }
  const [option, setoptiopn] = useState<optionlist>([]);
  ////////////////////////////////////////////////////////////////////////////////////////useeffect
  ////////////////////////////////////init useeffect
  useEffect(() => {
    console.log(product.productId);
    GetOptionsOfProduct(product.productId).then((Response) => {
      setoptiopn(Response.data.dataList);
    });
  }, []);
  useEffect(() => {
    if (firstdata == false) {
      console.log(option);
      setfirstdata(true);
    }
  }, [option]);
  /////////////////////////////////////////////////////////////////////////////////////////modal handell
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setopenmodal(false);
    setdata(initdata);
    props.setforeload(!props.forload);
  };
  /////////////////////////////////////////////////////////////////////////////////////// handell chckbox
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    salePrice: number
  ) => {
    let tempoptionsId: Array<number> = [];
    let tempprice = data.price;
    if (!!data.optionsId) {
      tempoptionsId = data.optionsId;
    }
    if (!!event.target.checked) {
      ///////check if exsit don't need to add id to array
      if (!tempoptionsId.includes(Number(event.target.value))) {
        tempprice = tempprice + salePrice * data.quantity;
        tempoptionsId.push(Number(event.target.value));
        setdata({
          ...data,
          ["optionsId"]: tempoptionsId,
          ["price"]: tempprice,
        });
      }
      ////////////////////////////////////////////////////
      // tempoptionsId.push(Number(event.target.value));
      // setdata({ ...data, ["optionsId"]: tempoptionsId });
      // console.log(tempprice);
    } else {
      tempprice = tempprice - salePrice * data.quantity;
      tempoptionsId = tempoptionsId.filter(
        (item: any) => item != Number(event.target.value)
      );
      setdata({ ...data, ["optionsId"]: tempoptionsId, ["price"]: tempprice });
      // console.log(tempoptionsId);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////// increase and decrease
  const handleNumberChangeincrease = () => {
    let temp = data.quantity;
    let tempprice = data.price;
    tempprice = tempprice + tempprice / data.quantity;
    temp = temp + 1;
    setdata({ ...data, ["quantity"]: temp, ["price"]: tempprice });
  };
  const handleNumberChangedecrease = () => {
    let temp = data.quantity;
    let tempprice = data.price;
    if (temp != 1) {
      temp = temp - 1;
      tempprice = tempprice - tempprice / data.quantity;
      setdata({ ...data, ["quantity"]: temp, ["price"]: tempprice });
    } else {
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////// save
  const handell = () => {
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("dataKey"));

    let temp = items;
    if (!!items) {
      const found = items.some((el: any) => el.productId === data.productId);
      if (!!found) {
        let Find = items.find(
          (x: any) =>
            x.optionsId.sort().toString() === data.optionsId.sort().toString()
        );
        if (!!Find) {
          // temp.filter((item: any) => {
          //   item !== items;
          // });
          let Find1 = items.find(
            (x: any) =>
              x.productId === data.productId &&
              x.optionsId.sort().toString() === data.optionsId.sort().toString()
          );
          let Find2 = temp.findIndex(
            (x: any) =>
              x.productId === data.productId &&
              x.optionsId.sort().toString() === data.optionsId.sort().toString()
          );
          if (!!Find1) {
            temp.splice(Find2, 1);
            Find1.quantity = Find1.quantity + data.quantity;
            Find1.price = Find1.price + data.price;

            // console.log([Find1]);
            if (temp) {
              temp.push(Find1);
              // console.log("************************************");
              // console.log(temp);
              localStorage.setItem("dataKey", JSON.stringify(temp));
            } else {
              localStorage.setItem("dataKey", JSON.stringify([Find1]));
            }
          }
        } else {
          temp.push(data);
          localStorage.setItem("dataKey", JSON.stringify(temp));
        }
      } else {
        temp.push(data);
        localStorage.setItem("dataKey", JSON.stringify(temp));
      }
    } else {
      localStorage.setItem("dataKey", JSON.stringify([data]));
    }
    handleClose();
  };
  console.log(data.price);
  
  //////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="menu_icon ">
        {firstdata ? (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div
              id="rtl_side"
              className="w-[80vw] sm:w-[60vw] h-[85vh] p-2  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
            >
              <div className="w-full h-[35%] flex flex-col justify-between items-center ">
                <div className="w-[15%] h-[80%]">
                  <img
                    className="pt-7 sm:pt-0 sm:w-full sm:h-full"
                    src="../../../../images/icon/herbal-tea.png"
                    alt=""
                  />
                </div>
                <div className="flex rtl w-[80%] h-20 justify-around items-center">
                  <div className="text-xl sm:text-2xl">
                    {product.productName}
                  </div>
                  <div className="text-xl sm:text-2xl flex gap-1 ">
                    <div>{product.salePrice}</div>
                    <div>تومان</div>
                  </div>
                </div>
                <div className="">
                {product.description}
                </div>
              </div>
              <Divider sx={{ marginTop: "3px" }} />
              <div className="w-full rtl h-[40%] flex justify-center  flex-col items-center overflow-y-scroll">
                {!!option
                  ? option.map((item: any) => (
                      <div className="w-[95%] sm:w-[50%] flex items-center justify-between">
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              onChange={(event) => {
                                handleChange(event, item.salePrice);
                              }}
                            />
                          }
                          label={item.title}
                        />
                        <div className=" flex gap-1 ">
                          <div>{item.salePrice}</div>
                          <div>تومان</div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="w-full h-[30%] flex flex-col justify-center items-center">
                <div className="flex rtl">
                  <p>مجموع انتخاب شما:</p>
                  <p>{data.price}</p>
                </div>
                <div className="flex w-full pt-3 lg:pt-0 rtl justify-around">
                  <div
                    className=" flex rtl py-1 bg-[#652D0D] rounded-md px-1
                 sm:w-auto h-[30px] sm:h-auto text-[11px] sm:text-base  items-center justify-center"
                  >
                    <div
                      className="cursor-pointer p-1 text-white"
                      onClick={handleNumberChangeincrease}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                    <div className="p-1 px-2 text-[#652D0D] bg-white">
                      {data.quantity}
                    </div>
                    <div
                      className=" cursor-pointer p-1 text-white"
                      onClick={handleNumberChangedecrease}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    onClick={handell}
                    className=" cursor-pointer rtl w-[110px] sm:w-auto h-[30px] sm:h-auto text-[11px] sm:text-base flex items-center justify-center sm:p-2 text-white rounded-md  bg-[#652D0D] 
                  hover:bg-white hover:text-[#652D0D] border border-[#652D0D] hover:border-[#652D0D] hover:border transition-all ease-in duration-100"
                  >
                    افزودن به سبد خرید
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleClose()}
                className="cursor-pointer absolute top-5 left-5 "
              >
                بستن
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default modalOption;
