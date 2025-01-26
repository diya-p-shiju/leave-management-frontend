import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import employee from "../assets/employee.jpg";
import LoginForm from "@/components/user-components/Auth/Login";
import Loading from "@/components/user-components/Misc-Pages/Loading";

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


