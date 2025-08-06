import { Draw } from "@/lib/types";

export function getAllDraws(): Draw[] {
  const stored = localStorage.getItem("draws");
  return stored ? JSON.parse(stored) : [];
}

export function getDrawFromStorage(id: string): Draw | null {
  const draws = getAllDraws();
  return draws.find((d) => d.id === id) ?? null;
}

export function saveDrawToStorage(updated: Draw) {
  const draws = getAllDraws();
  const newDraws = draws.map((d) => (d.id === updated.id ? updated : d));
  localStorage.setItem("draws", JSON.stringify(newDraws));
}
