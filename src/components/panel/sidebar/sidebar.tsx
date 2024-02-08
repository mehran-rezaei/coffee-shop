import Sidebar_logo from "./sidebar_logo/sidebar_logo";
import Sidebar_menu_container from "./sidebar_menu/sidebar_menu_container";
import { useRouter } from "next/router";

function Sidbar(props: any) {
  const router = useRouter();
  const { setbtn } = props;
  return (
    <div className="py-5 flex flex-col gap-7 ">
      <div className="flex items-center px-3 w-full">
        <svg
          onClick={() => {
            router.push("/");
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24 "
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-[#652D0D] cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </div>

      <div className="flex justify-center items-center w-full">
        <Sidebar_logo />
      </div>
      <div className="mt-16 text-[#E0C9AC]">
        <Sidebar_menu_container setbtn={setbtn} />
      </div>
    </div>
  );
}

export default Sidbar;
