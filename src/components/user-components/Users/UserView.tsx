import { useState } from "react";
import { useData } from "@/components/context/DataProvider";
import { Button } from "@/components/ui/button";
import { Sheet, Table } from "@mui/joy";
import UserForm from "./UserForm";
import newRequest from "@/utils/newRequest";
import DeleteConfirmation from "../Misc-Pages/DeleteConfirmation";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: number;
};

const GetUsers = () => {
  const { users, departments, isLoading, error, refetchUsers, refetchDepartments } = useData();

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((dept) => dept._id === departmentId);
    return department ? department.name : "Unknown Name";
  };

  const handleCreate = () => {
    setFormMode("create");
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleUpdate = (user: User) => {
    setFormMode("update");
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);

    try {
      await newRequest.delete(`/user/${userToDelete}`);
      alert("User deleted successfully");
      refetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="my-20">
      <div className="flex justify-between">
        <Button className="mb-4" onClick={handleCreate}>
          Create New User
        </Button>
        <Button className="border-2 border-green-500 hover:bg-green-500 hover:border-green-500 hover" variant="outline">
          Logout
        </Button>
      </div>

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
          <caption>Users List</caption>
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
                <td>{"*".repeat(user.password.length)}</td>
                <td>{getDepartmentName(user.department)}</td>
                <td>
                  <Button className="m-2" onClick={() => handleUpdate(user)}>
                    Update Item
                  </Button>
                  <Button
                    className="m-2"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => handleDelete(user._id)}
                  >
                    {isDeleting ? "Deleting..." : "Delete Item"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {showForm && (
        <UserForm
          mode={formMode}
          initialData={formMode === "update" ? selectedUser : undefined}
          onClose={handleCloseForm}
        />
      )}

      {/* Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        departmentName={userToDelete ? users.find(user => user._id === userToDelete)?.name || "" : ""}
      />
    </div>
  );
};

export default GetUsers;
