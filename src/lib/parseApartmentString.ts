import type { Apartment } from "@/lib/types";

export function parseApartmentString(str: string): Apartment {
  const parts = str.split(" - ");
  const block = parts[0] || "";
  const type = parts[1] || "";
  const rest = parts[2] || "";

  const match = rest.match(/^(\d+\.?KAT) - \((.+)\)$/); 
  const floor = match?.[1] || "";
  const facade = match?.[2] || "";

  const codeMatch = type.match(/([A-Z])$/); 
  const code = codeMatch?.[1] || "";

  return {
    id: `${block}-${floor}-${code}`,
    block,
    floor,
    type,
    facade,
    code,
    raw: str,
  };
}
