import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user-components/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/context/ProtectedRoute";
import User from "./pages/User";
import HigherAuthority from "./pages/HigherAuthority";

const App = () => {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
