  import { Button } from "@/components/ui/button";
  import { useState, ChangeEvent, FormEvent } from "react";
  import { motion } from "framer-motion";
  import newRequest from "@/utils/newRequest";
  import { AxiosError } from "axios";
  import { useNavigate } from "react-router-dom";

  const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);
      try {
        const success = await newRequest.post("/auth/login", { email, password });
        const {name, role} = success.data.user;
        localStorage.setItem("user", JSON.stringify(name));
        localStorage.setItem("role", role);
        localStorage.setItem("authenticated", "true");
        console.log("Login successful");
        navigate("/admin"); 
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Invalid credentials");
          console.error(error.response?.data);
        } else {
          setError("Something went wrong. Please try again.");
          console.error("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="flex min-h-full rounded-3xl mt-16 items-center justify-center ">
        <motion.div
          className="w-full max-w-sm p-8 h-[600px] bg-white bg-opacity-80 pt-20 rounded-lg shadow-lg flex flex-col gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-semibold text-center text-black mb-10">
            Login to Your Account
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg  focus:outline-none mb-5"
              whileFocus={{ scale: 1.01 }}
            />
            {/* focus:ring-green-500 focus:ring-2 */}
            <motion.input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg  focus:outline-none mb-5"
              whileFocus={{ scale: 1.02 }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            © 2025 
          </p>
        </motion.div>
      </div>
    );
  };

  export default LoginForm;
