function Sidebar_menu_item(props:any) {
  const {setbtn}=props
    return ( 
    <div onClick={()=>setbtn(props.id)} className="bg-[#652D0D] flex justify-center cursor-pointer items-center p-2 w-10/12 rounded-3xl">
      {props.name}
    </div>
   
   );
}

export default Sidebar_menu_item;