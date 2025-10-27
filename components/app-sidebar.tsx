"use client";

import * as React from "react";
import {
  AudioWaveform,
  BrushCleaning,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  ClipboardList,
  Calendar,
  DollarSign,
  ChartColumn
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample teams, navMain, projects remain static
const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];
const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reservations",
    url: "/reservations",
    icon: ClipboardList,
  },
  {
    title: "Front Desk",
    url: "/frontdesk",
    icon: Calendar,
  },
  {
    title: "Billing",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Housekeeping",
    url: "#",
    icon: BrushCleaning,
  },
  {
    title: "End of Day",
    url: "#",
    icon: Bot,
  },
  {
    title: "Reports",
    url: "#",
    icon: ChartColumn,
    items: [
      { title: "Overview", url: "#" },
      { title: "Forecast", url: "#" },
    ],
  },
  {
    title: "Configuration",
    url: "#",
    icon: Settings2,
    isActive: true,
    items: [
      { title: "Settings", url: "/settings" },
      { title: "Hotel", url: "#" },
      { title: "Room", url: "#" },
    ],
  },
];
// const projects = [
//   { name: "Design Engineering", url: "#", icon: Frame },
//   { name: "Sales & Marketing", url: "#", icon: PieChart },
//   { name: "Travel", url: "#", icon: Map },
// ];

export type AppSidebarUser = {
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
  email: string;
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: AppSidebarUser }) {
  const displayUser = user
    ? {
      name: user.user_metadata?.name || user.email,
      email: user.email,
      avatar: user.user_metadata?.avatar_url || "/avatars/shadcn.jpg",
    }
    : {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
