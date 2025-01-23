import { User } from "@/types/types";
import newRequest from "@/utils/newRequest";
import { useEffect, useState } from "react";

const GetLeaves = (Prop: User) => {
  const [leave, setLeave] = useState<User[]>([]);
  const [department, setDepartment] = useState<string>([]);

  useEffect(() => {
    const getLeaves = async () => {
      try {
        const response = await newRequest.get(`leave/`);
        setLeave(response.data);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const department = await newRequest.get(
            `department/${response.data[i].department}`
          );
          setDepartment(...response.data[i], department.data);
        }
        setDepartment(department.data);
      } catch (error) {
        console.log("error in fetching the leaves", error);
      }
    };
  }, []);

  return <div></div>;
};

export default GetLeaves;
