function Report_card(props: any) {
  return (
    <>
      <div className="w-[30%] h-[80%] border-2 border-[#652D0D] rounded-xl p-5 flex flex-col ">
        <div className="text-[#652D0D] text-xl">{props.name}</div>
        <div className="text-[#652D0D] text-3xl flex justify-center gap-2 items-center h-[100%]">
          <div>{props.data}</div>
          <div>تومان</div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Report_card;
