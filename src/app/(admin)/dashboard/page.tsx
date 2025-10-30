import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive";
import { SectionCards } from "@/components/admin/section-cards";

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
}
