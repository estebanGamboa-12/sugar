import Experience from "@/components/Experience";
import SmoothScroll from "@/components/SmoothScroll";

export default function Page() {
  return (
    <SmoothScroll>
      <main className="bg-[#070707] text-[#f6ecdd]">
        <Experience />
      </main>
    </SmoothScroll>
  );
}
