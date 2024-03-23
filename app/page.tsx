"use client"
import Image from "next/image";
import BasicBars from "./components/BasicBars";
import TemporaryDrawer from "./components/Drawer";

export default function Home() {
  return (
    <main className="" >

      <div className="relative p-4">
        <div className="absolute top-0 right-0">
          <TemporaryDrawer />
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between  ">
        <BasicBars />

      </div>

    </main>
  );
}
