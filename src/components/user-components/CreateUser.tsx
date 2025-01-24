import { useReducer } from "react";
import { User } from "../../types/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const initialState: User = {
  name: "",
  email: "",
  password: "",
  role: "",
  department: "",
};

const reducer = (state: User, action: { type: string; payload: string }) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "role":
      return { ...state, role: action.payload };
    case "department":
      return { ...state, department: action.payload };
    default:
      return state;
  }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form Submitted");
};

const CreateUser = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Create User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={state.name}
              onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
              placeholder="Enter name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={state.email}
              onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
              placeholder="Enter email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={state.password}
              onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
              placeholder="Enter password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </Label>
            <Input
              id="role"
              type="text"
              value={state.role}
              onChange={(e) => dispatch({ type: "role", payload: e.target.value })}
              placeholder="Enter role"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </Label>
            <Input
              id="department"
              type="text"
              value={state.department}
              onChange={(e) => dispatch({ type: "department", payload: e.target.value })}
              placeholder="Enter department"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
