import { createContext } from "react";

export const UserContext = createContext({ role: "", authenticated: "" });

interface Props {
    children: React.ReactNode;
    }

const ContextProvider :React.FC <Props> = ({children}) => {
  const role = localStorage.getItem("role")?.toString() || "";
  const authenticated = localStorage.getItem("authenticated")?.toString() || "false";


  return (
    <div>
        <UserContext.Provider value={{ role, authenticated }}>
            {children}
        </UserContext.Provider>
      
    </div>
  )
}

export default ContextProvider
