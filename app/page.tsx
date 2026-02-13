import Experience from "@/components/Experience";
import SmoothScroll from "@/components/SmoothScroll";

export default function Page() {
  return (
    <SmoothScroll>
      <main className="bg-[#090909] text-[#f7f0e6]">
        <Experience />
      </main>
    </SmoothScroll>
  );
}
