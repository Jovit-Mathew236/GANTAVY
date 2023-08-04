"use client";

import Line from "@/src/components/atom/line/line";
import HomeSubNav from "@/src/components/organisms/homeSubNav/homeSubNav";
import TimingPage from "@/src/components/pages/timing/timing";

export default function TimingPageParent() {
  return (
    <div className="">
      <Line />
      <HomeSubNav />
      <TimingPage />
    </div>
  );
}
