"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  apartments: string[];
  onSelect: (apartmentId: string) => void;
};

type ParsedApartment = {
  id: string;
  block: string;
  type: string;
  floor: string;
  facade: string;
};

function parseApartmentString(str: string): ParsedApartment {
  const parts = str.split(" - ");
  const block = parts[0]?.trim() || "";
  const type = parts[1]?.trim() || "";
  const floor = parts[2]?.trim() || "";
  const facadeRaw = parts[3] || "";
  const facade = facadeRaw.replace("(", "").replace(")", "").trim();

  return {
    id: str,
    block,
    type,
    floor,
    facade,
  };
}

export function ApartmentFilter({ apartments, onSelect }: Props) {
  const parsedApartments = useMemo(
    () => apartments.map(parseApartmentString),
    [apartments]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [blockFilter, setBlockFilter] = useState("");
  const [floorFilter, setFloorFilter] = useState("");
  const [facadeFilter, setFacadeFilter] = useState("");

  const filteredApartments = parsedApartments.filter((apt) => {
    const matchesSearch = apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = !blockFilter || apt.block === blockFilter;
    const matchesFloor = !floorFilter || apt.floor === floorFilter;
    const matchesFacade = !facadeFilter || apt.facade === facadeFilter;
    return matchesSearch && matchesBlock && matchesFloor && matchesFacade;
  });

  const uniqueBlocks = Array.from(new Set(parsedApartments.map((apt) => apt.block)));
  const uniqueFloors = Array.from(new Set(parsedApartments.map((apt) => apt.floor)));
  const uniqueFacades = Array.from(new Set(parsedApartments.map((apt) => apt.facade)));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Daire Seç</h2>

      <Input
        placeholder="Daire ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label>Blok</Label>
          <Select value={blockFilter} onValueChange={setBlockFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Blok seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              {uniqueBlocks.map((block) => (
                <SelectItem key={block} value={block}>
                  {block}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Kat</Label>
          <Select value={floorFilter} onValueChange={setFloorFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Kat seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              {uniqueFloors.map((floor) => (
                <SelectItem key={floor} value={floor}>
                  {floor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Cephe</Label>
          <Select value={facadeFilter} onValueChange={setFacadeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Cephe seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              {uniqueFacades.map((facade) => (
                <SelectItem key={facade} value={facade}>
                  {facade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className="border rounded p-2 space-y-1 max-h-64 overflow-auto">
        {filteredApartments.map((apt) => (
          <li
            key={apt.id}
            onClick={() =>
              onSelect(`${apt.block}, ${apt.floor}, ${apt.facade}`) 
            }
            className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
          >
            {apt.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
