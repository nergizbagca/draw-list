"use client";

import { useEffect } from "react";
export default function DummyDataInitializer() {
  useEffect(() => {
    const dummyId = "dummy-kura-verisi-v1";

    const isAlreadySet = localStorage.getItem("draw");
    if (isAlreadySet) {
      console.log("ℹ️ Dummy data zaten yüklü.");
      return;
    }

    fetch("/mock_draws.json")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("draw", JSON.stringify(data));
        localStorage.setItem("selectedDrawId", dummyId);
        console.log("✅ Dummy data localStorage'a yüklendi.");
      })
      .catch((err) => {
        console.error("❌ Dummy data yüklenirken hata oluştu:", err);
      });
  }, []);

  return null;
}
