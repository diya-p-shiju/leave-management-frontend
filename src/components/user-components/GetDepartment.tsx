import newRequest from "@/utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";




const testDepartmentID = "67913a2f17ef4b37f7a2b7ac";

const GetDepartment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["department"],
    queryFn: () =>
      newRequest.get(`/department/${testDepartmentID}}`).then((res) => {
        return res.data;
      }),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
        <h1>Department</h1>
        <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            </div>
    </>
  )
};

export default GetDepartment;
