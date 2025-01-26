import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@mui/lab";
import newRequest from "@/utils/newRequest";

type LeaveFormProps = {
  mode: "create" | "update";
  initialData?: any;
  onClose: () => void;
};

const LeaveForm = ({ mode, initialData, onClose }: LeaveFormProps) => {
  const [applicant, setApplicant] = useState<string | null>(initialData?.applicant || "");
  const [fromDate, setFromDate] = useState<Date | null>(initialData?.fromDate ? new Date(initialData.fromDate) : null);
  const [toDate, setToDate] = useState<Date | null>(initialData?.toDate ? new Date(initialData.toDate) : null);
  const [reason, setReason] = useState<string>(initialData?.reason || "");
  const [substituteSuggestion, setSubstituteSuggestion] = useState<string | null>(initialData?.substituteSuggestion.suggestion || "");
  const [status, setStatus] = useState<string>(initialData?.status.hodApproval.approved ? "approved" : "pending");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (mode === "update" && initialData) {
      setApplicant(initialData.applicant);
      setFromDate(new Date(initialData.fromDate));
      setToDate(new Date(initialData.toDate));
      setReason(initialData.reason);
      setSubstituteSuggestion(initialData.substituteSuggestion.suggestion);
      setStatus(initialData.status.hodApproval.approved ? "approved" : "pending");
    }
  }, [mode, initialData]);

  const handleSubmit = async () => {
    if (!applicant || !fromDate || !toDate || !reason) {
      setError("All fields are required!");
      return;
    }
    setError("");

    try {
      const leaveData = {
        applicant,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        reason,
        substituteSuggestion,
        status,
        actualLeaveDays: Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)), // Example calculation
      };

      if (mode === "create") {
        await newRequest.post("/leave", leaveData);
        alert("Leave request created successfully!");
      } else {
        await newRequest.put(`/leave/${initialData._id}`, leaveData);
        alert("Leave request updated successfully!");
      }

      onClose();
    } catch (err) {
      alert("Failed to submit leave request");
    }
  };

  return (
    <div className="modal">
      <h2>{mode === "create" ? "Create Leave Request" : "Update Leave Request"}</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Applicant</label>
        <Input
          value={applicant || ""}
          onChange={(e) => setApplicant(e.target.value)}
          disabled={mode === "update"}
        />
      </div>
      <div>
        <label>From Date</label>
        <DatePicker
          value={fromDate}
          onChange={(date) => setFromDate(date)}
          required
        />
      </div>
      <div>
        <label>To Date</label>
        <DatePicker
          value={toDate}
          onChange={(date) => setToDate(date)}
          required
        />
      </div>
      <div>
        <label>Reason</label>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Substitute Suggestion</label>
        <Input
          value={substituteSuggestion || ""}
          onChange={(e) => setSubstituteSuggestion(e.target.value)}
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      <Button onClick={handleSubmit}>{mode === "create" ? "Submit" : "Update"}</Button>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  );
};

export default LeaveForm;
