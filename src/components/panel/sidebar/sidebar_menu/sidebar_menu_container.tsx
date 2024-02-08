import Sidebar_menu_item from "./sidebar_menu_item/sidebar_menu_item";
const menu_item = [
  { id: "1", name: "کنترل موجودی" },
  { id: "2", name: "سفارشات" },
  { id: "3", name: "گزارشات" },
];
function Sidebar_menu_container(props:any) {
    const {setbtn}=props
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {menu_item.map((item: any) => (
        <Sidebar_menu_item id={item.id} setbtn={setbtn}  name={item.name} />
      ))}
    </div>
  );
}

export default Sidebar_menu_container;
