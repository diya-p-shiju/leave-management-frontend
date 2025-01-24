import { Navigate } from "react-router-dom";
import { UserContext } from "./ContextProvider";
import { useContext } from "react";

interface RouteProps {
  children : React.ReactNode;
  roles: string[];
}

interface roleProps {
  role  : string;
  authenticated : string;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children, roles }) => {
  const { role, authenticated } = useContext<roleProps>(UserContext);

  console.log("data from context", role, authenticated);
  console.log("data from app.tsx", roles);

  if(authenticated === "false"){
    console.log("Not authenticated");
    return <Navigate to="/login" replace />;

  }

  if(!roles.includes(role)){
    console.log("Role is not correct ");
    return <Navigate to="/login" replace />

  }

  return children;
}

export default ProtectedRoute;