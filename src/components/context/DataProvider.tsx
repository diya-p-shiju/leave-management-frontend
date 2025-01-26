import { createContext, useContext } from "react";
import newRequest from "@/utils/newRequest";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

//User type that is going to be cached
interface User {
  id: number;
  name: string;
  email:string;
  role:string;

}

// department type that is going to be cached as well
interface Department {
  id: number;
  name: string;
  description : string;
  
}

//for creating a context of data
interface DataContextType {
  users: User[];
  departments: Department[];
  isLoading: boolean;
  refetchUsers: () => void;
  refetchDepartments: () => void;
}

// Create the context with default values
const DataContext = createContext<DataContextType>({
  users: [],
  departments: [],
  isLoading: true,
  refetchUsers: () => {}, 
  refetchDepartments: () => {}, 
});

// Initialize the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Fetch functions
const fetchUsers = async (): Promise<User[]> => {
  try {
    const success = await newRequest.get("/getUsers");
    return success.data;
  } catch (error) {
    console.log("Error while fetching initial user cache data", error);
    throw error;
  }
};

const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const success = await newRequest.get("/getDepartments");
    return success.data;
  } catch (error) {
    console.log("Error while caching the department details in the start", error);
    throw error;
  }
};

// Context provider component, triggers the fetch functions, get the data and save it as a context via DataContext.Provider
export const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const { data: users, isLoading: usersLoading, refetch: refetchUsers} = useQuery<User[]>(["users"], fetchUsers);
  const { data: departments, isLoading: departmentsLoading, refetch: refetchDepartments } = useQuery<Department[]>(["departments"], fetchDepartments);

  const isLoading = usersLoading || departmentsLoading;

  return (
    <DataContext.Provider
      value={{
        users: users || [],
        departments: departments || [],
        isLoading,
        refetchUsers,
        refetchDepartments
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for accessing context 
export const useData = () => {
  return useContext(DataContext);
};

// AppWrapper component that provides React Query and context to your app
interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataContextProvider>{children}</DataContextProvider>
    </QueryClientProvider>
  );
};
