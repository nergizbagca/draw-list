"use client";

import { useEffect } from "react";
import mockData from "@/data/mock_draws.json";

export default function DummyDataInitializer() {
  useEffect(() => {
    const existing = localStorage.getItem("draws");

    if (!existing) {
      const dataWithGroupIds = {
        ...mockData,
        groups: Array.isArray(mockData.groups)
          ? mockData.groups.map((group, index) => ({
              ...group,
              id: `group-${index + 1}`,
            }))
          : [],
      };

      localStorage.setItem("draws", JSON.stringify([dataWithGroupIds]));
    }
  }, []);

  return null;
}

