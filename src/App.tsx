import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user-components/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/context/ProtectedRoute";
import User from "./pages/User";
import HigherAuthority from "./pages/HigherAuthority";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";


import TableView from "./components/user-components/TableView";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="/table" element={<TableView />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes for Admin Page  */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for User Page  */}
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["nonteaching-staff", "teaching-staff"]}>
                <User />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Higher Authority - HOD, DIRECTOR, PRINCIPAL  */}
          <Route
            path="/high"
            element={
              <ProtectedRoute roles={["hod", "director", "principal"]}>
                <HigherAuthority />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
