import { createContext } from "react";

const role = localStorage.getItem("role")?.toString() || "";
const authenticated = localStorage.getItem("authenticated") === "true"? "true" : "false";

export const UserContext = createContext<{ role: string; authenticated: string }>({ role: role, authenticated: authenticated });

interface Props {
    children: React.ReactNode;
    }

const ContextProvider :React.FC <Props> = ({children}) => {

  const role = "admin";
  const authenticated = "true";


  return (
    <div>
        <UserContext.Provider value={{ role, authenticated }}>
            {children}
        </UserContext.Provider>
      
    </div>
  )
}

export default ContextProvider
