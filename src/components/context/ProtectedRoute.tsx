import { Navigate } from "react-router-dom";
import { userContext } from "./ContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { role, authenticated } = useContext(userContext);

  if(!authenticated){
    return <Navigate to="/login" replace />;

  }
  return (

  );
}