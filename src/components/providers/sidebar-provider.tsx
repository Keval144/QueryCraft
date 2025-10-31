"use client";
import { SidebarProvider } from "../shadcn-ui/sidebar";
import { AppSidebar } from "../admin/app-sidebar";

export default function SidebarWrapperClient({
  children,
  defaultOpen,
  user,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
  user: { name: string; email: string; avatar: string };
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      defaultOpen={defaultOpen}
    >
      <AppSidebar variant="inset" user={user} />
      {children}
    </SidebarProvider>
  );
}
