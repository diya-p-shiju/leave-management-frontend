import { AppSidebar } from "./dashboard /App-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import UserView from "../components/user-components/Users/UserView"


interface Props {
  children : React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
          {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Page;



// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import GetAllUsers from "../components/user-components/Users/UserView";
// import DepartmentView from "@/components/user-components/Departments/DepartmentView";
// import LogoutButton from "@/components/user-components/Auth/Logout";

// const Admin = () => {
//   const [showCreateUser, setShowCreateUser] = useState(false);
//   const [showDepartments, setShowDepartments] = useState(false);

//   return (
//     <div className="container mx-auto w-full h-full p-4">
//       {/* Navigation & Logout */}
//       <div className="flex justify-between mb-4">
//         {/* Navigation buttons */}
//         <div className="flex justify-start space-x-4">
//           <Button
//             onClick={() => {
//               setShowDepartments(false);
//               setShowCreateUser(false); 
//             }}
          
//           >
//             Users
//           </Button>
//           <Button
//             onClick={() => {
//               setShowCreateUser(false); 
//               setShowDepartments(true);
//             }}
          
//           >
//             Departments
//           </Button>
//         </div>

//         <LogoutButton /> {/* Call the LogoutButton component */}
//       </div>

//       {/* Conditional rendering for CreateUser and DepartmentView */}
//       {showCreateUser && (
//         <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
//           <button
//             onClick={() => setShowCreateUser(false)}
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//           >
//             &times;
//           </button>
//           <CreateUser />
//         </div>
//       )}

//       {showDepartments && (
//         <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
//           <button
//             onClick={() => setShowDepartments(false)}
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//           >
//             &times;
//           </button>
//           <DepartmentView />
//         </div>
//       )}

//       {/* Default or fallback view showing Users */}
//       {!showCreateUser && !showDepartments && <GetAllUsers />}
//     </div>
//   );
// };

// export default Admin;
