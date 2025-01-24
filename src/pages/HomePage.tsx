import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { useNavigate } from "react-router-dom";

const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" };
const HomePage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-purple-900 grid grid-cols-12 grid-row-4 gap-10  py-10">
      <div className="col-start-2 col-span-10 row-start-1 row-span-1  ">
        <div className="h-20 m-10 w-[1500px] opacity-40 shadow-2xl border-2 flex justify-between border-slate-100 rounded-2xl fixed z-20 ">
        <span></span>
        <Button
            className=" rounded-full bg-purple text-sm font-mono p-10 hover:bg-purple-500 hover-text-white"
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="col-start-2 col-span-6 row-start-2 row-span-3  ">
        <div className=" text-wrap flex flex-col justify-start items-center p-10 h-full w-full py-20">
          <p className="text-7xl font-semibold text-white font-sans text-left leading-normal mt-20">
            Leave Management System so that you spend holidays stress-free.
          </p>
          <Button
            className="mt-10 rounded-full bg-purple-500 text-2xl font-mono p-10 "
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="col-start-8 col-span-4 row-start-2 row-span-3  flex justify-center items-center">
        <Spiral />
      </div>
    </div>
  );
};

export default HomePage;

const box: React.CSSProperties = {
  width: 50,
  height: 50,
  backgroundColor: "white",
  borderRadius: 10,
  position: "absolute",
  top: 0,
  left: 0,
  offsetPath: `path("M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5")`,
};

const Spiral: React.FC = () => {
  return (
    <div style={{ position: "relative" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
        <motion.path
          d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
          fill="transparent"
          strokeWidth="12"
          stroke="white"
          strokeLinecap="round"
          initial={{ pathLength: 0.001 }}
          animate={{ pathLength: 1 }}
          transition={transition}
        />
      </svg>
      <motion.div
        style={box}
        initial={{ offsetDistance: "0%", scale: 2.5 }}
        animate={{ offsetDistance: "100%", scale: 1 }}
        transition={transition}
      />
    </div>
  );
};
