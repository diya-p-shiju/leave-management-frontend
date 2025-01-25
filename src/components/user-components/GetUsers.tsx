import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import newRequest from "@/utils/newRequest";

// Define the structure of the user data
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
}

const GetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await newRequest.get("/user");
        setUsers(response.data);
      } catch (err: any) {
        console.error("Error while fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        A List of Users Fetched from the API
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Password</strong></TableCell>
              <TableCell><strong>Department Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                {/* Mask password with asterisks */}
                <TableCell>{"*".repeat(user.password.length)}</TableCell>
                <TableCell>{user.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetUsers;
