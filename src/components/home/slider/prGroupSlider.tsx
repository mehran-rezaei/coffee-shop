import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Grid from "@mui/material/Unstable_Grid2";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import axiosInstance from "@/Dataservice/Configs/axiosInstance";
import ModalOption from "../PrOptionModal/modalOption";

// context
import { CartContext } from "@/context/cartContextProvider";

const PrGroupSlider = (props: any) => {
  const { state2, dispatch2 } = useContext<any>(CartContext);

  const [openmodal, setopenmodal] = useState<boolean>(false);
  const [modaldata, setmodaldata] = useState({});
  const [prGroupData, setPrGroupData] = useState<any>([]);
  const [prGroupItem, setPrGroupItem] = useState<any>([]);
  const [modalIsOpen, setIsOpen] = useState<any>(false);
  const [activedItem, setActiveItem] = useState<boolean>(false);
  const [activedItemModal, setActiveItemModal] = useState<boolean>(false);
  const [active, setactive] = useState<any>(false);
  const [Product, setProduct] = useState<any>([]);
  const [productData, setProductData] = useState<any>({});
  const [AllProduct, setAllProduct] = useState<any>([]);
  const [prGroupTitle, setprGroupTitle] = useState<any>("");
  const images = [
    "../../../../images/icon/herbal-tea.png",
    "../../../../images/icon/Cake.png",
    "../../../../images/icon/hot-beverage.png",
    "../../../../images/icon/ice-cream.png",
  ];

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const getAllproduct = async () => {
      const fetchallProduct = await axiosInstance.get(
        "http://etokco.ir/Product/GetAllProductService"
      );
      setProduct(fetchallProduct.data.dataList);
    };
    const getprGroup = async () => {
      const prGroup = await axiosInstance.get(
        `/ProductGroup/GetDeadEndProductGroups`
      );
      setPrGroupData(prGroup.data.dataList);
    };
    getAllproduct();
    getprGroup();
  }, []);

  const getProductGroupItem = async (id: number) => {
    setActiveItem(true);
    setactive(id);
    const prGroupItem = await axiosInstance.get(
      `http://etokco.ir/ProductGroup/GetProductGroupItem?Id=${id}`
    );
    setProduct(prGroupItem.data.dataList);
    console.log(prGroupItem.data.dataList);
    
  };
  ///////////////////////////////////////////////////////////////
  const [headerColor, setHeaderColor] = useState("");
  const listenScrollEvent = () => {
    window.scrollY > 0
      ? setHeaderColor("rgba(245,245,245,0.95)")
      : setHeaderColor("");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  });
  console.log(Product);

  ///////////////////////////////////////////////////////////////

  return (
    <>
      <div
        style={{ backgroundColor: headerColor }}
        className={`px-2 md:px-20 pt-10 sm:pt-16 pb-5 sm:pb-5 sticky top-0 h-[200px] sm:h-[210px]  flex justify-center ${headerColor} != ''`}
      >
        {modalIsOpen ? (
          ""
        ) : (
          <div className="w-[95%] sm:w-[80%] z-1 ">
            <Swiper
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Pagination]}
              className="mySwiper"
              spaceBetween={30}
              slidesPerView={3}
              style={{ zIndex: "1" }}
              breakpoints={{
                1280: {
                  slidesPerView: 6,
                },
              }}
            >
              {prGroupData &&
                prGroupData.map((group: any, index: number) => (
                  <SwiperSlide
                    key={group.id}
                    className="cursor-pointer h-[50px] mt-6 sm:mt-4  w-[60px] sm:h-[50px] sm:w-[60px] border-2  border-[#8080805d] overflow-hidden  rounded-xl sm:rounded-3xl shadow-sm"
                  >
                    <div
                      onClick={() => {
                        getProductGroupItem(group.id);
                        setprGroupTitle(group.name);
                      }}
                      className={`rounded-md flex flex-col overflow-hidden min-h-[50px]  px-3 py-3  justify-center items-center  ${
                        active == group.id ? "Active" : null
                      }`}
                    >
                      <div className="flex justify-center">
                        <img
                          className=" w-[30px] h-[30px] sm:h-[40px] sm:w-[40px]"
                          src={`${images[index]}`}
                        />
                      </div>
                      <h2 className="text-[14px] sm:text-[25px] text-center sm:text-lg mt-3  sm:pr-2   text-[#652D0D]">
                        {group.name}
                      </h2>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </div>
      <div className="sm:px-8 py-4  sm:py-8 ">
        <div className="flex justify-center">
          <h2 className="text-[#652D0D] text-[30px] mt-5 pb-2 mb-8 border-[#E0C9AC] border-b-[3px]">
            {prGroupTitle ? prGroupTitle : "همه محصولات"}
          </h2>
        </div>
        <Grid container columnGap={3} rowGap={4} justifyContent={"center"}>
          {!!Product
            ? Product.map((item: any) => (
                <Grid
                  container
                  xs={11}
                  md={5}
                  className="sm:w-[500px] h-[150px] sm:h-[150px] flex flex-col justify-between items-center sm:pl-10 sm:pr-2 shadow-md rounded-2xl border"
                >
                  <Grid xs={4} className="">
                    <div>
                      <img src="../../../../images/home_coffee.png" alt="" />
                    </div>
                  </Grid>
                  <Grid id={""} xs={8}>
                    <div className="flex flex-col gap-1 sm:mb-8 mb-4 mr-1">
                      <h2 className=" text-[18px] sm:text-[22px] font-medium   ">
                        {item.productName}
                      </h2>
                      {/* {productName}  */}
                      <p className="text-sm">{item.description}</p>
                    </div>
                    <div className="text-[#652D0D] mr-2 items-center flex pl-4 sm:pl-8 justify-between">
                      <h2 className="font-medium text-[16px] sm:text-[20px]">
                        {item.salePrice} تومان
                      </h2>
                      {/* {cost} */}
                      <div className="flex w-fit items-center bg-[#652d0d] rounded-md">
                        <div
                          onClick={() => {
                            setmodaldata(item);
                            setopenmodal(true);
                          }}
                          className="cursor-pointer bg-[#652D0D] px-3 py-2 rounded-md"
                        >
                          <img
                            src="../../../../images/plus3.png"
                            className="h-[15px] w-[15px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ))
            : null}
        </Grid>
      </div>
      {openmodal ? (
        <ModalOption
          setopenmodal={setopenmodal}
          product={modaldata}
          setforeload={props.setforeload}
          foreload={props.forload}
        />
      ) : null}
      {Product.length != 0 ? null : (
        <div className=" w-full flex justify-center">
          <div className="text-[#652D0D] sm:text-3xl">
            محصولی برای نمایش وجود ندارد!
          </div>
        </div>
      )}
    </>
  );
};

export default PrGroupSlider;
