import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function parseApartmentString(str: string) {
  const [blockPart, floorPart, typePart] = str.split(" - ").map((s) => s.trim());

  const typeMatch = typePart?.match(/(.*)\s\((.*)\)/);
  const type = typeMatch?.[1]?.trim() || "";
  const facade = typeMatch?.[2]?.trim() || "";

  return {
    block: blockPart || "",
    floor: floorPart || "",
    facade,
  };
}
