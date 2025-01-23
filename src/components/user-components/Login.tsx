import { Button } from "@/components/ui/button";
import { useState, ChangeEvent, FormEvent } from "react";
import newRequest from "@/utils/newRequest";
import { AxiosError } from "axios";

const loginForm: React.FC = () => {
  const [email, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<AxiosError | null>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target; // destructuring the input value 'e'
    if (name === "email") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const success = await newRequest.post("/auth/login", {
        email,
        password,
      });
      if (success)
        [console.log("The user credentials has been successfuly submitted")];
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        console.log(error.response?.data)
      }
      else {
        setError(null);
        console.log("null error in login")
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden justify-center items-center gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="bg-blue-200"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="bg-blue-200"
          placeholder="password"
        />
        <Button type="submit">Login</Button>
        {/* error & error has to be mentioned */}
      </form>
    </div>
  );
};

export default loginForm;
