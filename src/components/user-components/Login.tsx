  import { Button } from "@/components/ui/button";
  import { useState, ChangeEvent, FormEvent } from "react";
  import { motion } from "framer-motion";
  import newRequest from "@/utils/newRequest";
  import { AxiosError } from "axios";
  import { Navigate } from "react-router-dom";

  const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
        localStorage.setItem("role", JSON.stringify(role));
        localStorage.setItem("authenticated", "true");
        <Navigate to="/admin" replace />;
        console.log("Login successful");
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
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <motion.div
          className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Login to Your Account
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50"
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
