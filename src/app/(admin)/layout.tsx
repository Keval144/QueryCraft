import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/admin/site-header";
import SidebarWrapper from "@/components/providers/sidebar-provider";
import { SidebarInset } from "@/components/shadcn-ui/sidebar";
import { getSession } from "@/lib/get-session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const user = session?.user;

  if (user.role === "user") redirect("/chats");
  const safeUser = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    avatar: user?.image ?? "/assets/pfp.jpg",
  };

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarWrapper user={safeUser} defaultOpen={defaultOpen}>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarWrapper>
  );
}
