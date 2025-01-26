import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/joy";
import { Sheet, Table } from "@mui/joy";
import newRequest from "@/utils/newRequest";
import DeleteConfirmation from "../Misc-Pages/DeleteConfirmation";
import { useData } from "@/components/context/DataProvider";


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

  const { data: leaves, isLoading, isError } = useQuery({
    queryKey: ["leaves"],
    queryFn: async () => {
      const response = await newRequest.get("/leave/");
      return response.data;
    },
  });

  const { departments } = useData(); // Use the useData hook to get departments

  const getDepartmentName = (departmentId: string) => {
    const department = departments?.find((dept) => dept.id === departmentId);
    return department ? department.name : "Unknown Department";
  };

  const toggleApproval = useMutation({
    mutationFn: async ({
      id,
      role,
    }: {
      id: string;
      role: "hod" | "principal";
    }) => {
      const statusField = role === "hod" ? "hodApproval" : "principalApproval";
      return newRequest.put(`/leave/${id}`, {
        [`status.${statusField}.approved`]: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });

  const deleteLeave = useMutation({
    mutationFn: async (id: string) => {
      await newRequest.delete(`/leave/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLeaveToDelete(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !leaves) return <p>Failed to load leave data.</p>;

  return (
    <div className="my-20">
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
            {leaves.map((leave: LeaveRequest) => (
              <tr key={leave._id}>
                <td>{leave.applicant.name}</td>
                <td>{leave.applicant.email}</td>
                <td>{leave.applicant.role}</td>
                <td>{getDepartmentName(leave.applicant.department)}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
                <td>{leave.actualLeaveDays}</td>
                <td>
                  {leave.substituteSuggestion ? (
                    <div>
                      <strong>User:</strong> {leave.substituteSuggestion.suggestedUser}
                      <br />
                      <strong>Suggestion:</strong> {leave.substituteSuggestion.suggestion}
                    </div>
                  ) : (
                    <em>No suggestion provided</em>
                  )}
                </td>
                <td>
                  <Button
                    variant="solid"
                    color={leave.status.hodApproval.approved ? "success" : "warning"}
                    onClick={() =>
                      toggleApproval.mutate({ id: leave._id, role: "hod" })
                    }
                    disabled={leave.status.hodApproval.approved}
                  >
                    {leave.status.hodApproval.approved ? "Approved" : "Pending"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="solid"
                    color={leave.status.principalApproval.approved ? "success" : "warning"}
                    onClick={() =>
                      toggleApproval.mutate({ id: leave._id, role: "principal" })
                    }
                    disabled={leave.status.principalApproval.approved}
                  >
                    {leave.status.principalApproval.approved ? "Approved" : "Pending"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="solid"
                    color="danger"
                    onClick={() => handleDelete(leave._id)}
                    disabled={isDeleting}
                  >
                    {isDeleting && leaveToDelete === leave._id ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        departmentName={
          leaveToDelete
            ? leaves.find((leave) => leave._id === leaveToDelete)?.applicant.name || ""
            : ""
        }
      />
    </div>
  );
};

export default LeaveView;
