import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useData } from "@/components/context/DataProvider";
import { Button } from "@/components/ui/button";

// Define the structure of the user data
type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string; // department is a reference to department _id
};

type Department = {
  _id: string;
  name: string;
};

const GetUsers = () => {
  const { users, departments, isLoading, error } = useData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Memoizing the columns definition
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "User ID",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
      {
        accessorKey: "password",
        header: "Password",
        size: 150,
        Cell: ({ row }) => <span>{"*".repeat(row.original.password.length)}</span>, // Mask password
      },
      {
        accessorKey: "department", // Will resolve department name later in the cell renderer
        header: "Department",
        size: 200,
        Cell: ({ row }) => {
          const departmentId = row.original.department;
          const department = departments.find(
            (dept) => dept._id.toString() === departmentId.toString()
          );
          return department ? department.name : "Unknown";
        },
      },
      {
        header: "Options",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <Button className="m-2">Update Item</Button>
            <Button variant="destructive">Delete Item</Button>
          </div>
        ),
      },
    ],
    [departments] // Recalculate if departments data changes
  );

  const table = useMaterialReactTable({
    columns,
    data: users, // Memoized users data
  });

  return <MaterialReactTable table={table} />;
};

export default GetUsers;
