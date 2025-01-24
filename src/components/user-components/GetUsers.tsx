import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Define the structure of the user data
import { getUser } from "@/types/types";
import newRequest from "@/utils/newRequest";

const GetUsers = () => {
  const [users, setUsers] = useState<getUser[]>([]);

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await newRequest.get("/user");
        setUsers(response.data);
      } catch (err: any) {
        console.log("error while fetching messages",err);
      } 
    };

    fetchUsers();
  }, []);


  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of users fetched from the API.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetUsers;
