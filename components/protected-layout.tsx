import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient} from "@/lib/supabase/server";
import { AppSidebar } from "@/components/app-sidebar";
import type { AppSidebarUser } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import UserMenu from "@/components/user-menu";

type ProtectedLayoutProps = {
  children: ReactNode;
  pageTitle?: string;
};

export default async function ProtectedLayout({
  children,
  pageTitle = "",
}: ProtectedLayoutProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  // Ensure we have a user with an email before passing to AppSidebar
  if (!data.user.email) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={data.user as AppSidebarUser} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {pageTitle && (
              <span className="font-medium text-base">{pageTitle}</span>
            )}
          </div>
          <UserMenu />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
