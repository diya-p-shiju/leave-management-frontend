import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import employee from "../assets/employee.jpg";
import LoginForm from "@/components/user-components/Auth/Login";

const HomePage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  const text = "Streamline Your       Employee Leave       Management             System   ";
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <img
        src={employee}
        alt="Employee"
        className="absolute inset-0 w-full h-full object-cover brightness-75 -z-20"
      />
      <div className="container min-h-[700px] my-32 flex-col justify-center mx-44 overflow-hidden">
        <div className="h-4/5 w-[1000px] m-20 overflow-hidden">
          <h1 className="text-white font-bold text-8xl leading-tight text-left">
            {text.split("").map((char, index) => (
              <m.span
                key={index}
                className="inline-block"
                custom={index}
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {char === " " ? "\u00A0" : char}
              </m.span>
            ))}
          </h1>
        </div>
        <div className="ml-20"></div>
        <div className="min-h-[700px] min-w-[500px] absolute right-40 top-40">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" };
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
