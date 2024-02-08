import Report_con from "./report_con";
function Report() {
  return (
    <>
      <div className="w-full h-full p-5 flex flex-col gap-5">
        <div className="w-full text-[#652D0D] h-[15%] text-5xl">گزارشات</div>
        <Report_con />
      </div>
    </>
  );
}

export default Report;
