import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user-components/Auth/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/context/ProtectedRoute";
import User from "./pages/User";
import HigherAuthority from "./pages/HigherAuthority";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import CardView from "./components/user-components/Leaves/CardView-Leave";


import TableView from "./components/user-components/Leaves/TableView-Leave";
import FakeCardView from "./components/user-components/Leaves/FakeCardView-Leave";
import GetUserById from "./components/user-components/Users/GetUserById";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="/table" element={<TableView />} />
          <Route path="/card" element={<FakeCardView />} />

          {/* Protected Routes for Admin Page  */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute roles={["admin", "hod", "principal"]}>
                <GetUserById />
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
