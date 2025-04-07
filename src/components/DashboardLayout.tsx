
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  MessageSquare, 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Channels",
      path: "/channels",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "New Contacts",
      path: "/contacts",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background flex-col">
      {/* Mobile navigation */}
      <div className="lg:hidden flex items-center border-b px-4 py-3 h-14">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>WhatsApp Manager</span>
              </SheetTitle>
            </SheetHeader>
            <div className="py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              
              <Separator className="my-2" />
              
              <button
                onClick={() => logout()}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">WhatsApp Channel Manager</h1>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r">
          <div className="flex flex-col flex-1">
            <div className="flex items-center h-14 px-4 border-b gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">WhatsApp Manager</h1>
            </div>
            <div className="flex-1 flex flex-col py-4">
              <nav className="flex-1 flex flex-col">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary border-r-2 border-primary"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto">
                <Separator className="my-2" />
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Logged in as <span className="font-semibold">{user?.username}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
