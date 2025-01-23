import { Textarea } from "../ui/textarea"; //shadcn imports
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import DatePicker from "../atomic-Components/CalendarPicker";

import { Leave } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReducer, useState } from "react";
import newRequest from "@/utils/newRequest";

const initialState: Leave = {
  applicant: "",
  department: "",
  fromDate: new Date(),
  toDate: new Date(),
  reason: "",
  substituteSuggestion: {
    suggestedUser: "",
    suggestion: "",
  },
  actualLeaveDays: 0,
};

const reducer = (state: Leave, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "applicant":
      return { ...state, applicant: action.payload };
    case "department":
      return { ...state, department: action.payload };
    case "fromDate":
      return { ...state, fromDate: action.payload };
    case "toDate":
      return { ...state, toDate: action.payload };
    case "reason":
      return { ...state, reason: action.payload };
    case "updateSubstituteSuggestion":
      return {
        ...state,
        substituteSuggestion: {
          ...state.substituteSuggestion,
          [action.payload.name]: action.payload.value,
        },
      };
    case "actualLeaveDays":
      return { ...state, actualLeaveDays: action.payload };
    default:
      return state;
  }
};

const CreateLeave = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "suggestedUser" || name === "suggestion") {
      dispatch({
        type: "updateSubstituteSuggestion",
        payload: { name, value },
      });
    } else {
      dispatch({ type: name, payload: value });
    }

    console.log(state);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await newRequest.post("/leave/", {
        applicant: state.applicant,
        fromDate: state.fromDate,
        toDate: state.toDate,
        reason: state.reason,
        substituteSuggestion: state.substituteSuggestion,
        status: "pending",
        actualLeaveDays: state.actualLeaveDays,
      });
      if (success) {
        console.log("leave application successfully created");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex items-center overflow-hidden h-screen w-screen justify-center">
      <div className="w-96 h-96">
        <Card>
          <CardHeader>
            <CardTitle>Leave form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* reason */}
              <div className="grid items-center max-w-sm gap-2">
                <Label htmlFor="text" className="font-medium">
                  Reason for Leave
                </Label>
                <Textarea
                  placeholder="Type your reason here"
                  name="reason"
                  value={state.reason}
                  onChange={handleChange}
                />
              </div>

              {/* fromDate */}
              <DatePicker label="From Date" name="fromDate" selectedDate={state.fromDate} onSelect={(date)=>dispatch({type:"fromDate", payload:date})} />
            
              {/* toDate */}
              <DatePicker label="To Date" name="toDate" selectedDate={state.toDate} onSelect={(date)=>dispatch({type:"toDate", payload:date})} />

              {/* substituteSuggestion */}
              

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateLeave;
