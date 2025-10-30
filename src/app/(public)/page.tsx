import FloatingNavbar from "@/components/hero/floating-navbar";

function page() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_90%,#ffffff_40%,#1d9bf0_100%)] bg-size-[100%_100%]" />

      {/* Your Content/Components */}
      <FloatingNavbar />
      <div className="min-h-400"></div>
    </div>
  );
}

export default page;
