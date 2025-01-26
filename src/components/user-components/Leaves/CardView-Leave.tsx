import React from 'react'
import TableView from './TableView-Leave'
import { Button } from '../../ui/button'
import { LeaveDataProps } from '@/types/types'


const data: LeaveDataProps = {
    applicant: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'teaching-staff',
        department: 'Science',
    },
    fromDate: '2025-01-06',
    toDate: '2025-01-06',
    reason: 'I want leave',
    actualLeaveDays: 1,
    substituteSuggestion: 'Can cover my subject, has done before',
    status: {
        hodApproval: { approved: false },
        principalApproval: { approved: false },
    },
}

const CardView: React.FC<LeaveDataProps> = ({ applicant, fromDate, toDate, reason, actualLeaveDays, substituteSuggestion, status }) => {
  return (
    <div className="flex h-full w-full justify-center items-center container ">
{/* <div className="max-h-[900px]  max-w-[1850px] w-[2000px] border-2 border-green-500 mx-10 mt-32 absolute rounded-xl "> */}
<div className="max-h-[700px] border-2 w-96 hover:border-green-700 hover:shadow-green-300 hover:shadow-sm border-green-500 mx-10 mt-32 absolute rounded-xl">
    <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{applicant.name}</h2>
        <p className="text-gray-700 mb-1"><strong>Email:</strong> {applicant.email}</p>
        <p className="text-gray-700 mb-1"><strong>Role:</strong> {applicant.role}</p>
        <p className="text-gray-700 mb-1"><strong>Department:</strong> {applicant.department}</p>
        <p className="text-gray-700 mb-1"><strong>From Date:</strong> {fromDate}</p>
        <p className="text-gray-700 mb-1"><strong>To Date:</strong> {toDate}</p>
        <p className="text-gray-700 mb-1"><strong>Reason:</strong> {reason}</p>
        <p className="text-gray-700 mb-1"><strong>Actual Leave Days:</strong> {actualLeaveDays}</p>
        <p className="text-gray-700 mb-1"><strong>Substitute Suggestion:</strong> {substituteSuggestion}</p>
        <p className="text-gray-700 mb-1"><strong>HOD Approval:</strong> {status.hodApproval.approved ? 'Approved' : 'Pending'}</p>
        <p className="text-gray-700 mb-1"><strong>Principal Approval:</strong> {status.principalApproval.approved ? 'Approved' : 'Pending'}</p>
        <div className="flex justify-around gap-2 m-5">
            <Button variant="outline">Approve</Button>
            <Button variant="destructive">Reject</Button>
        </div>
    </div>
</div>
    
{/* </div> */}
    </div>
  )
}



export default CardView
