import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/joy";
import { Sheet, Table } from "@mui/joy";
import newRequest from "@/utils/newRequest";
import DeleteConfirmation from "../Misc-Pages/DeleteConfirmation";  // Ensure this is a valid component
import { useData } from "@/components/context/DataProvider";
import LeaveForm from "./LeaveForm";  // Ensure this is a valid component

export type LeaveRequest = {
  _id: string;
  applicant: {
    name: string;
    email: string;
    role: string;
    department: string;
  };
  fromDate: string;
  toDate: string;
  reason: string;
  actualLeaveDays: number;
  substituteSuggestion: {
    suggestedUser: string;
    suggestion: string;
  } | null;
  status: {
    hodApproval: { approved: boolean };
    principalApproval: { approved: boolean };
  };
};

const LeaveView = () => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [leaveToUpdate, setLeaveToUpdate] = useState<LeaveRequest | null>(null);

  const { departments } = useData();

  const userRole = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");  // Added userId from localStorage

  const fetchLeaves = async () => {
    if (userRole === "teaching-staff" || userRole === "non-teaching-staff") {
      return await newRequest.get(`/leave/${userId}`);
    } else if (userRole === "hod") {
      const userDepartment = departments?.find((dept) => dept.id === userId);
      return await newRequest.get("/leave/", { params: { department: userDepartment?.id } });
    } else if (userRole === "principal" || userRole === "director") {
      return await newRequest.get("/leave/");
    }
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((dept) => dept._id === departmentId);
    return department ? department.name : "Unknown Name";
  };

  const { data: leaves, isLoading, isError } = useQuery({
    queryKey: ["leaves", userRole, userEmail],
    queryFn: fetchLeaves,
    staleTime: 5 * 60 * 1000,
  });

  const toggleApproval = useMutation({
    mutationFn: async ({ id, role, approve }: { id: string; role: "hod" | "principal"; approve: boolean }) => {
      const statusField = role === "hod" ? "hodApproval" : "principalApproval";
      return newRequest.put(`/leave/${id}`, {
        [`status.${statusField}.approved`]: approve,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves", userRole, userEmail] });
    },
  });

  const deleteLeave = useMutation({
    mutationFn: async (id: string) => {
      await newRequest.delete(`/leave/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves", userRole, userEmail] });
    },
  });

  const handleDelete = (id: string) => {
    setLeaveToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leaveToDelete) return;
    setIsDeleting(true);
    try {
      await deleteLeave.mutateAsync(leaveToDelete);
      alert("Leave deleted successfully");
    } catch (err) {
      console.error("Failed to delete leave:", err);
      alert("Failed to delete leave. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setLeaveToDelete(null);
    }
  };

  const handleUpdateLeave = (leave: LeaveRequest) => {
    setLeaveToUpdate(leave);
    setIsUpdateModalOpen(true);
  };

  const handleToggleApproval = (id: string, role: "hod" | "principal", currentStatus: boolean) => {
    toggleApproval.mutate({ id, role, approve: !currentStatus });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !leaves?.data) return <p>Failed to load leave data.</p>;

  return (
    <div className="my-20">
      <Button variant="solid" color="primary" onClick={() => setIsCreateModalOpen(true)}>
        Create Leave
      </Button>
      <Sheet>
        <Table>
          <caption>Leave Requests</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Days</th>
              <th>Substitute</th>
              <th>HOD Approval</th>
              <th>Principal Approval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.data.map((leave: LeaveRequest) => (
              <tr key={leave._id}>
                <td>{leave.applicant.name}</td>
                <td>{leave.applicant.email}</td>
                <td>{leave.applicant.role}</td>
                <td>{getDepartmentName(leave.applicant.department)}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
                <td>{leave.actualLeaveDays}</td>
                <td>{leave.substituteSuggestion?.suggestedUser ? JSON.stringify(leave.substituteSuggestion.suggestedUser.name) : "None"}</td>
                <td>
                  <Button
                    variant="solid"
                    color={leave.status.hodApproval.approved ? "success" : "warning"}
                    onClick={() =>
                      handleToggleApproval(leave._id, "hod", leave.status.hodApproval.approved)
                    }
                    disabled={userRole !== "hod"}
                  >
                    {leave.status.hodApproval.approved ? "Approved" : "Pending"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="solid"
                    color={leave.status.principalApproval.approved ? "success" : "warning"}
                    onClick={() =>
                      handleToggleApproval(leave._id, "principal", leave.status.principalApproval.approved)
                    }
                    disabled={userRole !== "principal"}
                  >
                    {leave.status.principalApproval.approved ? "Approved" : "Pending"}
                  </Button>
                </td>
                <td>
                  {/* Update Button */}
                  {(userId === leave.applicant.id || userRole === "principal") && (
                    <Button
                      variant="solid"
                      color="info"
                      onClick={() => handleUpdateLeave(leave)}
                    >
                      Update
                    </Button>
                  )}

                  {/* Delete Button */}
                  {(userId === leave.applicant.id || userRole === "principal") && (
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(leave._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting && leaveToDelete === leave._id ? "Deleting..." : "Delete"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      {/* Modal to confirm deletion */}
      {isModalOpen && (
        <DeleteConfirmation
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Modal to create a leave request */}
      {isCreateModalOpen && (
        <LeaveForm
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {/* Modal to update a leave request */}
      {isUpdateModalOpen && leaveToUpdate && (
        <LeaveForm
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          leave={leaveToUpdate}
        />
      )}
    </div>
  );
};

export default LeaveView;
