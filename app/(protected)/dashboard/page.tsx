import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
// import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { ThemeSwitcher } from "@/components/theme-switcher";
import ProtectedLayout from "@/components/protected-layout";
import { Dashboard } from "@/components/features/dashboard/Dashboard";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  return (
    <ProtectedLayout pageTitle="Dashboard">
      <Dashboard />
    </ProtectedLayout>
  );
}
