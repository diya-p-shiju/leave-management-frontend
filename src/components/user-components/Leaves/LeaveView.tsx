import { useState, useEffect } from "react";
import { useData } from "@/components/context/DataProvider";
import { Button } from "@/components/ui/button";
import { Sheet, Table } from "@mui/joy";
import LeaveForm from "./LeaveForm";
import newRequest from "@/utils/newRequest";

const LeaveView = () => {
  const { leaves, isLoading, error, refetchLeaves } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState<string | null>(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (confirmDelete) {
      const handleDelete = async () => {
        if (leaveToDelete) {
          setIsDeleting(true);
          try {
            await newRequest.delete(`/leave/${leaveToDelete}`);
            alert("Leave deleted successfully");
            refetchLeaves();
          } catch (err) {
            alert("Failed to delete leave");
          } finally {
            setIsDeleting(false);
            setConfirmDelete(false);
          }
        }
      };
      handleDelete();
    }
  }, [confirmDelete, leaveToDelete]);

  const handleDelete = (id: string) => {
    setLeaveToDelete(id);
    setConfirmDelete(true);
  };

  const handleCreate = () => {
    setFormMode("create");
    setSelectedLeave(null);
    setShowForm(true);
  };

  const handleUpdate = (leave: any) => {
    setFormMode("update");
    setSelectedLeave(leave);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedLeave(null);
  };

  const handleApprovalToggle = async (id: string, role: string) => {
    try {
      const statusField =
        role === "hod" ? "hodApproval" : role === "principal" ? "principalApproval" : null;
      if (statusField) {
        const updatedLeave = await newRequest.put(`/leave/${id}`, {
          [`status.${statusField}.approved`]: true,
        });
        alert("Leave approved successfully");
        refetchLeaves();
      }
    } catch (err) {
      alert("Error approving leave");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {role === "hod" && (
        <Button onClick={handleCreate}>Create Leave Request</Button>
      )}

      <Sheet>
        <Table>
          <caption>Leave Applications</caption>
          <thead>
            <tr>
              <th>User</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.applicant.name}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.status.hodApproval.approved ? "Approved" : "Pending"}</td>
                <td>
                  {role === "hod" && (
                    <Button
                      onClick={() => handleApprovalToggle(leave._id, "hod")}
                      disabled={leave.status.hodApproval.approved}
                    >
                      Approve by HOD
                    </Button>
                  )}
                  {role === "principal" && (
                    <Button
                      onClick={() => handleApprovalToggle(leave._id, "principal")}
                      disabled={leave.status.principalApproval.approved}
                    >
                      Approve by Principal
                    </Button>
                  )}
                  <Button onClick={() => handleUpdate(leave)}>Update</Button>
                  <Button
                    onClick={() => handleDelete(leave._id)}
                    disabled={isDeleting}
                    variant="destructive"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {showForm && (
        <LeaveForm
          mode={formMode}
          initialData={selectedLeave}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default LeaveView;
