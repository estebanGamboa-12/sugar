import dynamic from "next/dynamic";

import SmoothScroll from "@/components/ui/SmoothScroll";

const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <Experience />
    </SmoothScroll>
  );
}
