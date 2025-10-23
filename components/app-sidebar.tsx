"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  SquareTerminal,
  ClipboardList,
  Calendar
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
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "History", url: "/history" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [
      { title: "Genesis", url: "#" },
      { title: "Explorer", url: "#" },
      { title: "Quantum", url: "#" },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Introduction", url: "#" },
      { title: "Get Started", url: "#" },
      { title: "Tutorials", url: "#" },
      { title: "Changelog", url: "#" },
    ],
  },
  {
    title: "Setting",
    url: "/setting",
    icon: Settings2,
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
