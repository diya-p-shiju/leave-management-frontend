import { AppSidebar } from "./dashboard /App-sidebar" 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useLocation } from "react-router-dom"; // Import useLocation to get the current route

interface Props {
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  const location = useLocation(); // Get the current route

  return (
    <SidebarProvider>
      <AppSidebar>
        {/* Conditionally render sidebar options based on the route */}
        {location.pathname === "/admin" && (
          <>
            <SidebarOption label="User Management" href="/admin" />
            <SidebarOption label="Departments" href="/department" />
          </>
        )}
        {location.pathname === "/user" && (
          <SidebarOption label="Leave System" href="/user" />
        )}
      </AppSidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className="text-black text-md">
                   Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-white md:min-h-32">
            <div className=" h-56 mb-20 bg-white  z-20">
              <div className="flex flex-col p-2">
                <p className="text-left text-2xl font-normal leading-tight ">Leaves</p>
              </div>
             <div className="flex  gap-3 mx-4">
             <div className="min-h-36 rounded-lg ml-2 bg-teal-200 w-1/4 relative"></div>
              <div className="min-h-36 rounded-lg ml-2 bg-blue-200 w-1/4 relative"></div>
              <div className="min-h-36 rounded-lg ml-2 bg-purple-200 w-1/4 relative"></div>
              <div className="min-h-36 rounded-lg ml-2 bg-rose-200 w-1/4 relative"></div>
             </div>
               </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

// SidebarOption component for reusable sidebar links
interface SidebarOptionProps {
  label: string;
  href: string;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ label, href }) => {
  return (
    <a href={href} className="block px-4 py-2 text-sm hover:bg-gray-100">
      {label}
    </a>
  );
};

export default Page;