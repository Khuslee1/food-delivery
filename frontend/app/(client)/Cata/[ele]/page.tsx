"use client";

import { useParams } from "next/navigation";
import { TypeCata } from "../../_components/TypeCata";

export default function Home() {
  return (
    <div className="w-screen">
      <TypeCata />
    </div>
  );
}
