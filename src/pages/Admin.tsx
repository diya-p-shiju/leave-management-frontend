import { useState } from "react";
import CreateUser from "@/components/user-components/Users/CreateUser";
import GetAllUsers from "../components/user-components/Users/UserView";

const Admin = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);

  return (
    <div className="container mx-auto w-full h-full p-4">
      {showCreateUser ? (
        <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-lg p-4 bg-white border border-gray-300 rounded shadow-lg">
          <button
            onClick={() => setShowCreateUser(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          <CreateUser />
        </div>
      ) : (
        <GetAllUsers />
      )}

    </div>
  );
};

export default Admin;
