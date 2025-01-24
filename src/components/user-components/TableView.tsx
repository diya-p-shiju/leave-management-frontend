import { useMemo } from 'react';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

//Material UI Imports
import { Box, Button, Typography } from '@mui/material';

//Mock Data (replace with actual API fetch later)
const data = [
  {
    _id: '679256e3f8bffa21b8151ce5',
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
  },
];

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
  substituteSuggestion: string;
  status: {
    hodApproval: { approved: boolean };
    principalApproval: { approved: boolean };
  };
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<LeaveRequest>[]>(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        size: 200,
      },
      {
        accessorFn: (row) => row.applicant.name,
        id: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorFn: (row) => row.applicant.email,
        id: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorFn: (row) => row.applicant.role,
        id: 'role',
        header: 'Role',
        size: 150,
      },
      {
        accessorFn: (row) => row.applicant.department,
        id: 'department',
        header: 'Department',
        size: 150,
      },
      {
        accessorKey: 'fromDate',
        header: 'From Date',
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: 'toDate',
        header: 'To Date',
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        size: 250,
      },
      {
        accessorKey: 'actualLeaveDays',
        header: 'Actual Leave Days',
        size: 150,
      },
      {
        accessorKey: 'substituteSuggestion',
        header: 'Substitute Suggestion',
        size: 250,
      },
      {
        id: 'hodApproval',
        header: 'HOD Approval',
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color={row.original.status.hodApproval.approved ? 'success' : 'warning'}
            onClick={() => {
              // Toggle HOD approval logic here
              console.log('HOD Approval toggled for:', row.original._id);
            }}
          >
            {row.original.status.hodApproval.approved ? 'Approved' : 'Pending'}
          </Button>
        ),
        size: 150,
      },
      {
        id: 'principalApproval',
        header: 'Principal Approval',
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color={row.original.status.principalApproval.approved ? 'success' : 'warning'}
            onClick={() => {
              // Toggle Principal approval logic here
              console.log('Principal Approval toggled for:', row.original._id);
            }}
          >
            {row.original.status.principalApproval.approved ? 'Approved' : 'Pending'}
          </Button>
        ),
        size: 150,
      },
      {
        id: 'status',
        header: 'Status',
        Cell: ({ row }) => {
          const { hodApproval, principalApproval } = row.original.status;
          const status = hodApproval.approved && principalApproval.approved ? 'Approved' : 'Pending';
          return (
            <Typography
              variant="body2"
              sx={{
                backgroundColor: status === 'Approved' ? 'green' : 'orange',
                color: 'white',
                borderRadius: '4px',
                padding: '4px 8px',
                display: 'inline-block',
              }}
            >
              {status}
            </Typography>
          );
        },
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
