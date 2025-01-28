"use client";
import './LeaveView.css'

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import newRequest from "@/utils/newRequest";
import DeleteConfirmation from "../Misc-Pages/DeleteConfirmation";
import LeaveForm from "./LeaveForm"; 
import { useData } from "@/components/context/DataProvider";
import { useState } from "react";
import LoadingPage from "../Misc-Pages/Loading";

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
  substituteSuggestion: {
    suggestedUser: string;
    suggestion: string;
  } | null;
  status: {
    hodApproval: { approved: boolean };
    principalApproval: { approved: boolean };
  };
};

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: number;
};

const LeaveView = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "update">("create");
  const [leaveToEdit, setLeaveToEdit] = React.useState<LeaveRequest | null>(null);
  const [leaveToDelete, setLeaveToDelete] = React.useState<string | null>(null);

  const [showForm, setshowForm] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);

  const userId = localStorage.getItem("_id");
  const userRole = localStorage.getItem("role") || "";
  const userDepartment = localStorage.getItem("department");

  const { data: leaves, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await newRequest.get("/leave/");
      return response.data;
    },
  });

  const { departments } = useData();

  const getDepartmentName = (dep: string) => {
    const department = departments?.find((dept) => dept._id.toString() === dep);
    return department ? department.name : "Unknown Department";
  };

  const toggleApproval = useMutation({
    mutationFn: async ({
      id,
      role,
    }: {
      id: string;
      role: "hod" | "principal";
    }) => {
      const statusField = role === "hod" ? "hodApproval" : "principalApproval";
      return newRequest.put(`/leave/${id}`, {
        [`status.${statusField}.approved`]: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });

  const deleteLeave = useMutation({
    mutationFn: async (id: string) => {
      await newRequest.delete(`/leave/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });

  const openModal = (mode: "create" | "update", leave?: LeaveRequest) => {
    setModalMode(mode);
    setLeaveToEdit(leave || null);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leaveToDelete) return;
    try {
      await deleteLeave.mutateAsync(leaveToDelete);
      alert("Leave deleted successfully");
    } catch (err) {
      console.error("Failed to delete leave:", err);
      alert("Failed to delete leave. Please try again.");
    } finally {
      setLeaveToDelete(null);
    }
  };

  const filteredLeaves = React.useMemo(() => {
    if (userRole === "principal") {
      return leaves;
    } else if (userRole === "hod") {
      return leaves?.filter((leave: LeaveRequest) => leave.applicant.department === userDepartment);
    } else if (userRole === "director") {
      return leaves;
    } else {
      return leaves?.filter((leave: LeaveRequest) => leave.applicant.name === userId);
    }
  }, [leaves, userRole, userDepartment, userId]);


  const columns: ColumnDef<LeaveRequest>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "applicant.name",
      header: "Name",
    },
    {
      accessorKey: "applicant.email",
      header: "Email",
    },
    {
      accessorKey: "applicant.role",
      header: "Role",
    },
    {
      accessorKey: "applicant.department",
      header: "Department",
      cell: ({ row }) => getDepartmentName(row.original.applicant.department),
    },
    {
      accessorKey: "fromDate",
      header: "From Date",
      cell: ({ row }) => new Date(row.original.fromDate).toLocaleDateString(),
    },
    {
      accessorKey: "toDate",
      header: "To Date",
      cell: ({ row }) => new Date(row.original.toDate).toLocaleDateString(),
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "actualLeaveDays",
      header: "Days",
    },
    {
      accessorKey: "substituteSuggestion",
      header: "Substitute",
      cell: ({ row }) => {
        const substitute = row.original.substituteSuggestion;
        return substitute ? (
          <div className="p-2">
            <p className="p-1">User:</p> {JSON.stringify(substitute.suggestedUser).name}
            <br />
            <>Suggestion:</> {JSON.stringify(substitute.suggestion)}
          </div>
        ) : (
          <em>No suggestion provided</em>
        );
      },
    },
    {
      id: "principalApproval",
      header: "Principal Approval",
      cell: ({ row }: { row: any }) => (
        userRole === "principal" ? (
          <Button
            variant="outline"
            onClick={() =>
              toggleApproval.mutate({
                id: row.original._id,
                role: "principal",
                principalApproval: !row.original.status.principalApproval.approved,
              })
            }
          >
            {row.original.status.principalApproval.approved ? "Approved" : "Pending"}
          </Button>
        ) : (
          <p>{row.original.status.principalApproval.approved ? "Approved" : "Pending"}</p>
        )
      ),
    },
    {
      id: "hodApproval",
      header: "HOD Approval",
      cell: ({ row }) => (
        userRole === "hod" ? (
          <Button
            variant="outline"
            onClick={() =>
              toggleApproval.mutate({ id: row.original._id, role: "hod" })
            }
            disabled={row.original.status.hodApproval.approved}
          >
            {row.original.status.hodApproval.approved ? "Approved" : "Pending"}
          </Button>
        ) : (
          <p>{row.original.status.hodApproval.approved ? "Approved" : "Pending"}</p>
        )
      ),
    },
    {
      id: "actions",
      cell: ({ row }) =>
        (userRole === "director" || row.original.applicant.name === userId) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {row.original.applicant.name === userId && (
                <DropdownMenuItem onClick={() => openModal("update", row.original)}>
                   {row.original.applicant.name} - Update
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setLeaveToDelete(row.original._id)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: filteredLeaves || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  const handleCloseForm = () => {
    setshowForm(false);
    setSelectedUser(null);
  };

const handleCreate = () => {
  setFormMode("create");
  setshowForm(true);
  setSelectedUser(null);
}

const handleUpdate = (user: User) => {
  setFormMode("update");
  setSelectedUser(user);
  setshowForm(true);
}
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className = "flex justify-end mr-10">
          <Button onClick={handleCreate}>Create new Leave</Button>
        </div>

        <div className="rounded-md border overflow-x-auto overflow-y-auto max-h-[500px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showForm && (
        <LeaveForm
          mode={formMode}
          initialData={formMode === "update" ? selectedUser : undefined}
          onClose={handleCloseForm}
        />
      )}



      <DeleteConfirmation
        isOpen={!!leaveToDelete}
        onClose={() => setLeaveToDelete(null)}
        onConfirm={handleConfirmDelete} departmentName={""}      />
      {isModalOpen && (
        <LeaveForm
          mode={modalMode}
          onClose={() => setIsModalOpen(false)}
          {...(modalMode === "update" && leaveToEdit ? { leave: leaveToEdit } : {})}
        />
      )}
    </>
  );
};

export default LeaveView;
