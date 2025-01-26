import { LeaveDataProps } from "@/types/types";
import CardView from "./CardView";



const data: LeaveDataProps[] = [
  {
    applicant: {
      name: "John Doe",
      email: "johndoe@example.com",
      role: "teaching-staff",
      department: "Science",
    },
    fromDate: "2025-01-06",
    toDate: "2025-01-06",
    reason: "I want leave",
    actualLeaveDays: 1,
    substituteSuggestion: "Can cover my subject, has done before",
    status: {
      hodApproval: { approved: false },
      principalApproval: { approved: false },
    },
  },
  {
    applicant: {
      name: "JohnhyyyDoe",
      email: "johndoe@example.com",
      role: "teaching-staff",
      department: "Science",
    },
    fromDate: "2025-01-06",
    toDate: "2025-01-06",
    reason: "I want leave",
    actualLeaveDays: 1,
    substituteSuggestion: "Can cover my subject, has done before",
    status: {
      hodApproval: { approved: false },
      principalApproval: { approved: false },
    },
  },
]


const FakeCardView: React.FC = () => {
  return (
    <div>
      <div className="absolute">

      {data.map((data) => (
        <CardView {...data} />
      ))}
         </div>
    </div>
  );
};

export default FakeCardView;
