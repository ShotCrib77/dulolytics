"use client";
import { Suspense } from "react";
import StatsPageComponent from "../components/StatsPageComponent";

export default function StatsPage() {
  return (
    <Suspense>
      <StatsPageComponent />
    </Suspense>
  );
}