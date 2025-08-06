import { ApartmentParsed } from "@/lib/types";

export function parseApartmentString(str: string): ApartmentParsed {
  const [blockPart, typePart, floorPart, facadePart] = str.split(" - ");

  const block = blockPart.trim(); 
  const type = typePart.trim(); 
  const floor = floorPart.trim(); 
  const facade = facadePart?.replace("(", "").replace(")", "").trim();

  const code = type.split(" ")[1] || type;

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
