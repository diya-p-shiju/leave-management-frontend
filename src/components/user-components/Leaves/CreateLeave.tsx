import React, { useReducer, useState } from "react";
import { Textarea } from "../ui/textarea"; //shadcn imports
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import DatePicker from "../atomic-Components/CalendarPicker";

import { Leave } from "@/types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import newRequest from "@/utils/newRequest";
import GetUsers from "@/components/atomic-Components/GetSimilarUsers"; // Import the GetUsers component

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
      console.log("error while applying leave application");
    }
  };

  const handleSelectUser = (userId: string) => {
    dispatch({
      type: "updateSubstituteSuggestion",
      payload: { name: "suggestedUser", value: userId },
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 p-10">
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Leave Application Form
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reason */}
            <div>
              <Label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Leave
              </Label>
              <Textarea
                placeholder="Type your reason here"
                name="reason"
                value={state.reason}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* From Date */}
            <div>
              <DatePicker
                label="From Date"
                name="fromDate"
                selectedDate={state.fromDate}
                onSelect={(date) =>
                  dispatch({ type: "fromDate", payload: date })
                }
              />
            </div>

            {/* To Date */}
            <div>
              <DatePicker
                label="To Date"
                name="toDate"
                selectedDate={state.toDate}
                onSelect={(date) =>
                  dispatch({ type: "toDate", payload: date })
                }
              />
            </div>

            {/* Substitute Suggestion */}
            <div>
              <Label
                htmlFor="substituteSuggestion"
                className="block text-sm font-medium text-gray-700"
              >
                Suggest a Substitute
              </Label>
              <GetUsers onSelectUser={handleSelectUser} />
            </div>

            {/* Substitute Suggestion Reason */}
            <div>
              <Label
                htmlFor="suggestion"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for Substitute Suggestion
              </Label>
              <Textarea
                placeholder="Reason for substitute suggestion"
                name="suggestion"
                value={state.substituteSuggestion.suggestion}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLeave;
