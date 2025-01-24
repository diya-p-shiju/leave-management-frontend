import { createContext } from "react";

export const userContext = createContext();

interface Props {
    children: React.ReactNode;
    }

const ContextProvider :React.FC <Props> = ({children}) => {

    const role = "admin";
    const authenticated = "true";

  return (
    <div>
        <userContext.Provider value={{ role, authenticated }}>
            {children}
        </userContext.Provider>
      
    </div>
  )
}

export default ContextProvider
