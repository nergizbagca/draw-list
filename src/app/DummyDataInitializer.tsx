"use client";

import { useEffect } from "react";
import draws from "@/../public/mock_draws.json";

export default function DummyDataInitializer() {
  useEffect(() => {
    const isAlreadySet = localStorage.getItem("draw");
    if (isAlreadySet) {
      console.log("ℹDummy data zaten yüklü.");
      return;
    }

    localStorage.setItem("draw", JSON.stringify(draws));
    console.log("Dummy data localStorage'a yüklendi.");
  }, []);

  return null;
}
