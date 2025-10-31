import { AppNavbar } from "@/components/common/app-navbar";

function page() {
  return (
    <>
      <div className="relative min-h-dvh w-full bg-white">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_90%,#ffffff_40%,#1d9bf0_100%)] bg-[length:100%_100%] transition-all duration-700 ease-in-out dark:bg-[radial-gradient(125%_125%_at_50%_90%,#0a0c10_40%,#2563eb_100%)]" />

        <div className="relative z-10">
          <AppNavbar />
        </div>
      </div>
    </>
  );
}

export default page;
