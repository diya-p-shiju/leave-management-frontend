import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


const Layout: React.FC  = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-purple-900 grid grid-cols-12 grid-row-4 gap-10  py-10">
      <div className="col-start-2 col-span-10 row-start-1 row-span-1  ">
        <div className="h-20 m-10 w-[1500px] opacity-40 shadow-2xl border-2 flex justify-between border-slate-100 rounded-2xl fixed z-20 p-2 ">
        <span className="text-white text-4xl font-mono pt-2 font-extrabold">Leave System Inc.</span>
        <Button
            className=" rounded-full bg-purple text-sm font-mono p-10 hover:bg-purple-500 hover-text-white"
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>
        </div>
        <div className="col-start-2 col-span-10 row-start-2 max-h-[800px] row-span-3 overflow-y-hidden ">
        <div className="flex min-h-full h-96 bg-opacity-94  bg-white rounded-3xl items-center justify-center bg-gray-100">

      <Outlet />
      </div>
      </div>
        </div>
  )
};

export default Layout;