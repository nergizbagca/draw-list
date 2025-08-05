"use client";

import { useEffect } from "react";
import mockData from "@/data/mock_draws.json";

export default function DummyDataInitializer() {
  useEffect(() => {
    const existing = localStorage.getItem("draw");

    if (!existing) {
      localStorage.setItem("draw", JSON.stringify(mockData));
    }
  }, []);

  return null;
}
