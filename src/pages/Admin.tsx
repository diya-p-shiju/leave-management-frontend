import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateUser from "@/components/user-components/Users/CreateUser";
import GetAllUsers from "../components/user-components/Users/UserView";
import DepartmentView from "@/components/user-components/Departments/DepartmentView";
import LogoutButton from "@/components/user-components/Auth/Logout";


const Admin = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false); // New state for toggling department view

  return (
    <div className="container mx-auto w-full h-full p-4">
      {/* Logout Button */}
      <div className="flex justify-between mb-4">
      

        {/* Navigation buttons */}
        <div className="flex justify-start space-x-4">
          <Button
            onClick={() => {
              setShowDepartments(false);
              setShowCreateUser(false); // Ensure CreateUser is hidden when switching to departments
            }}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Users
          </Button>
          <Button
            onClick={() => {
              setShowCreateUser(false); // Hide user creation form if department view is selected
              setShowDepartments(true);
            }}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Departments
          </Button>
        </div>
        <div>
          <LogoutButton /> {/* Call the LogoutButton component */}
        </div>
      </div>

      {showCreateUser && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-lg p-4 bg-white border border-gray-300 rounded shadow-lg">
          <button
            onClick={() => setShowCreateUser(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          <CreateUser />
        </div>
      )}

      {showDepartments && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-lg p-4 bg-white border border-gray-300 rounded shadow-lg">
          <button
            onClick={() => setShowDepartments(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          <DepartmentView />
        </div>
      )}

      {/* You can display Users by default or in the absence of a selection */}
      {!showCreateUser && !showDepartments && <GetAllUsers />}
    </div>
  );
};

export default Admin;
