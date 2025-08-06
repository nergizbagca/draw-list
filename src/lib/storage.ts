import { Draw } from "./types";

const STORAGE_KEY = "draws";

export function getDrawsFromStorage(): Draw[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getDrawFromStorage(id: string): Draw | undefined {
  return getDrawsFromStorage().find((d: Draw) => d.id === id);
}

export function saveDrawsToStorage(draws: Draw[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draws));
}

export function updateDrawInStorage(updatedDraw: Draw) {
  const draws = getDrawsFromStorage();
  const index = draws.findIndex((d: Draw) => d.id === updatedDraw.id);
  if (index !== -1) {
    draws[index] = updatedDraw;
    saveDrawsToStorage(draws);
  }
}
