export function parseApartmentString(raw: string) {
  const regex = /^(\w+ Blok) - ([\d+]+ ?[ABC]?) - (\d+)\.KAT - \((GD|KU)\)$/i;
  const match = raw.match(regex);

  if (!match) {
    return {
      id: raw,
      block: "",
      type: "",
      floor: "",
      facade: "",
      code: "",
      raw,
    };
  }

  const [, block, type, floor, facade] = match;

  return {
    id: raw,
    block: block.trim(),       
    type: type.trim(),         
    floor: `${floor}.KAT`,     
    facade: facade.toUpperCase(), 
    code: `${block}-${type}-${floor}-${facade}`,
    raw,
  };
}
