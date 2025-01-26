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
import { useData } from "@/components/context/DataProvider";
import {User} from "../../../types/types";
import { Button } from "@/components/ui/button";

// Define the structure of the user data


const GetUsers = () => {
  const { users, departments, isLoading, error, refetchUsers, refetchDepartments } = useData();

  if(isLoading){
    return <p>Loading...</p>
  }
  
  if(error){
    return <p>{error}</p>
  }

  const getDepartmentName = (departmentId :string) =>{
    const success = departments.find((dept)=> (dept._id).toString() === (departmentId).toString())
    console.log(typeof(success?._id))
    return success ? success.name : "unknown name";
  }


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
              <TableCell><strong>Options</strong></TableCell>
              
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
                {/* <TableCell>{"*".repeat(user.password.length)}</TableCell> */}

                <TableCell>{user.password}</TableCell>
                <TableCell>{getDepartmentName(user.department)}</TableCell>
                <TableCell>
                <Button className="m-2">Update Item</Button>
                <Button variant="destructive">Delete Item</Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetUsers;
