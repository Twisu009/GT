"use client";

import Image from "next/image";
import action from "../../../public/static/images/action.jpg";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ReusableGenreDropdowns from "@/components/ui/genreDropdown";

export default function Genre() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="container mx-auto">
        <ReusableGenreDropdowns />
      </div>
    </main>
  );
}
