import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/context/ProtectedRoute";
import User from "./pages/User";
import HigherAuthority from "./pages/HigherAuthority";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import GetUserById from "./components/user-components/Users/GetUserById";
import Error from "./components/user-components/Misc-Pages/Error"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />

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
              <ProtectedRoute roles={["non-teaching-staff", "teaching-staff","hod","principal"]}>
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
       <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
