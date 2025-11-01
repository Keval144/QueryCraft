import { redirect } from "next/navigation";
import { AppNavbar } from "@/components/common/app-navbar";
import { getSession } from "@/lib/get-session";

async function Page() {
  const session = await getSession();

  const user = session?.user;

  if (user?.role === "user") redirect("/chats");
  if (user?.role === "admin") redirect("/dashboard");

  return (
    <div className="relative w-full">
      {/* only one screen height worth of gradient */}
      <div className="relative h-screen bg-[radial-gradient(125%_125%_at_50%_90%,#ffffff_40%,#1d9bf0_100%)] transition-all duration-700 ease-in-out dark:bg-[radial-gradient(125%_125%_at_50%_90%,#15181c_40%,#2563eb_100%)]">
        <AppNavbar />
      </div>

      {/* normal content below */}
      <div className="bg-background h-[400px]"></div>
    </div>
  );
}

export default Page;
