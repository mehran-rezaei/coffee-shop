import { Divider } from "@mui/material";

function Filter(props: any) {
  const { setfillter } = props;
  return (
    <>
      <div className="flex gap-10 py-10 w-[97%]">
        <div
          onClick={() => {
            setfillter(1);
          }}
          className=" bg-none text-[#652D0D]"
        >
          ثبت شده
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div
          onClick={() => {
            setfillter(2);
          }}
          className=" bg-none text-[#652D0D]"
        >
          تکمیل شده
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div
          onClick={() => {
            setfillter(3);
          }}
          className=" bg-none text-[#652D0D]"
        >
          لغو شده
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div
          onClick={() => {
            setfillter(0);
          }}
          className=" bg-none text-[#652D0D]"
        >
          همه
        </div>
      </div>
    </>
  );
}

export default Filter;
