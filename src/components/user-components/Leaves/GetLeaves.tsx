import { useEffect, useState } from "react";
import newRequest from "@/utils/newRequest";

const GetLeaves = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLeaves = async () => {
      try {
        // Fetch leaves
        const leaveResponse = await newRequest.get("/leave/");
        const leavesData = leaveResponse.data;

        // Fetch all departments
        const departmentResponse = await newRequest.get("/department/");
        const departments = departmentResponse.data;

        // Create a map for quick department lookup
        const departmentMap = departments.reduce(
          (map: Record<string, string>, dept: any) => {
            map[dept._id] = dept.name;
            return map;
          },
          {}
        );

        // Map department names into the leaves data
        const updatedLeaves = leavesData.map((leave: any) => ({
          ...leave,
          departmentName: departmentMap[leave.department] || "Unknown",
        }));

        setLeaves(updatedLeaves);
      } catch (error) {
        console.error("Error fetching leaves or departments", error);
      } finally {
        setLoading(false);
      }
    };

    getLeaves();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {leaves.map((leave) => (
        <div key={leave._id} className="border-b py-4">
          <h3 className="text-lg font-semibold">Reason: {leave.reason}</h3>
          <p className="text-gray-600">Department: {leave.departmentName}</p>
          <p className="text-gray-600">Applicant: {leave.applicant.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GetLeaves;
