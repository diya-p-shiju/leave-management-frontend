import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/user-components/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



import CreateLeave from "./components/user-components/CreateLeave";
import CreateUser from "./components/user-components/CreateUser";
import Admin from "./pages/Admin";


const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path ="/user" element={<CreateUser/>}/>
            <Route path ="/admin" element={<Admin />}/>
            <Route path ="/hod" />
            <Route path ="/principal" />
            <Route path ="/director" />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App