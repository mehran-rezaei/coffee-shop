import { Box, Button, Modal, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { menuContext } from "@/context/menuContext";
function Menu() {
  const { state, dispatch } = useContext(menuContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const logout = (): void => {
    Cookies.remove("name");
    Cookies.remove("phonenumber");
    Cookies.remove("address");
    Cookies.remove("refreshToken");
    Cookies.remove("token");
    Cookies.remove("Isuser");
    Cookies.remove("refreshTokenUser");
    router.push("/");
    localStorage.clear();
    handleClose();
  };
  return (
    <>
      <div className="menu_icon">
        <Button onClick={handleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-[#652D0D]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            id="rtl_side"
            className="w-[70%] md:w-[50%] 2xl:w-[40%]  h-full flex justify-center absolute right-0 items-center flex-col p-5"
          >
            <div className="w-[90%] h-[10%]  flex items-center justify-end">
              <svg
                className="w-16 h-16 text-[#652D0D] cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="w-[90%] text-[#652D0D] h-[90%] flex flex-col justify-start gap-3 items-center ">
              {!!Cookies.get("name") ? (
                <div className="w-full flex py-4 px-1 justify-center gap-4 items-center cursor-pointer text-xl md:text-2xl xl:text-4xl">
                  <div className=" z-10 text-right text-[#652D0D] text-sm  md:text-2xl">
                    <p>
                      {`${Cookies.get("name")} عزیز`}
                      <br /> به امیر شکلات خوش آمدی
                    </p>
                  </div>
                  <img className=" " src="../../../images/user.png" alt="" />
                </div>
              ) : null}
              <div className="w-[95%] h-[1px] bg-[#BEB8B8]"></div>
              <div
                onClick={() => {
                  router.push("/");
                  handleClose();
                }}
                className="w-full hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
              >
                صفحه اصلی
              </div>
              {/* <div
                onClick={() => {
                  router.push("/");
                  handleClose();
                }}
                className="w-full hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
              >
                منو دیجیتال
              </div> */}
              <div
                onClick={() => {
                  router.push("/card");
                }}
                className="w-full hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl  xl:text-3xl"
              >
                سبد خرید
              </div>
              {!!Cookies.get("name") ? null : (
                <div
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="w-full hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
                >
                  ورود به حساب - ثبت نام
                </div>
              )}
              {!!Cookies.get("name") ? (
                <div
                  onClick={() => {
                    router.push("/orderhistory");
                  }}
                  className="w-full hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
                >
                  تاریخچه سفارشات
                </div>
              ) : null}
              {!!Cookies.get("phonenumber") ? (
                <div
                  onClick={() => {
                    router.push("/userdashbord");
                  }}
                  className="w-full hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
                >
                  پروفایل
                </div>
              ) : null}
              {!!Cookies.get("name") ? (
                <div
                  onClick={logout}
                  className="w-full  hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
                >
                  خروج از حساب
                </div>
              ) : null}
              {!!Cookies.get("Isuser") ? (
                <div
                  onClick={() => {
                    router.push("/dashbord");
                  }}
                  className="w-full  hover:bg-[#E0C9AC70] rounded-xl flex py-4 px-1 justify-end items-center cursor-pointer text-xl md:text-2xl xl:text-3xl"
                >
                  داشبورد
                </div>
              ) : null}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Menu;
