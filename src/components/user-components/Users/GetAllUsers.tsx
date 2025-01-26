import { useEffect, useState, useMemo } from "react";
import { useData } from "@/components/context/DataProvider";
import { Button } from "@/components/ui/button";
import { Sheet, Table } from "@mui/joy";

// Define the structure of the user data
type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
};

type Department = {
  _id: string;
  name: string;
  description :string;
};

const GetUsers = () => {
  const [updateUsers, setUpdateUsers]= useState(false);
  const [deleteUsers, setDeleteUsers] = useState(false);
  const { users, departments, isLoading, error } = useData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Function to get the department name
  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(
      (dept) => dept._id.toString() === departmentId.toString()
    );
    return department ? department.name : "Unknown Name";
  };



  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={(theme) => ({
        pt: 1,
        borderRadius: "sm",
        transition: "0.3s",
        background: `linear-gradient(45deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[400]})`,
        "& tr:last-child": {
          "& td:first-child": {
            borderBottomLeftRadius: "8px",
          },
          "& td:last-child": {
            borderBottomRightRadius: "8px",
          },
        },
      })}
    >
      <Table stripe="odd" hoverRow>
        <caption>A List of Users Fetched from the API.</caption>
        <thead>
          <tr>
            <th style={{ width: "15%" }}>User ID</th>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "10%" }}>Role</th>
            <th style={{ width: "15%" }}>Password</th>
            <th style={{ width: "15%" }}>Department Name</th>
            <th style={{ width: "10%" }}>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {/* Mask password with asterisks */}
              <td>{"*".repeat(user.password.length)}</td>
              <td>{getDepartmentName(user.department)}</td>
              <td>
                <Button className="m-2">Update Item</Button>
                <Button variant="destructive">Delete Item</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};





export default GetUsers;
