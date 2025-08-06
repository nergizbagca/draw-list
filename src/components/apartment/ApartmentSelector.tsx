"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ApartmentParsed } from "@/lib/types";

type Props = {
  apartments: ApartmentParsed[];
};

export default function ApartmentSelector({ apartments }: Props) {
  const [search, setSearch] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("Tümü");
  const [selectedFloor, setSelectedFloor] = useState("Tümü");
  const [selectedFacade, setSelectedFacade] = useState("Tümü");
  const [selectedApartment, setSelectedApartment] =
    useState<ApartmentParsed | null>(null);

  const blocks = useMemo(
    () => ["Tümü", ...Array.from(new Set(apartments.map((a) => a.block)))],
    [apartments]
  );
  const floors = useMemo(
    () => ["Tümü", ...Array.from(new Set(apartments.map((a) => a.floor)))],
    [apartments]
  );
  const facades = useMemo(
    () => ["Tümü", ...Array.from(new Set(apartments.map((a) => a.facade)))],
    [apartments]
  );

  const filtered = useMemo(() => {
    return apartments.filter(
      (a) =>
        a.raw.toLowerCase().includes(search.toLowerCase()) &&
        (selectedBlock === "Tümü" || a.block === selectedBlock) &&
        (selectedFloor === "Tümü" || a.floor === selectedFloor) &&
        (selectedFacade === "Tümü" || a.facade === selectedFacade)
    );
  }, [apartments, search, selectedBlock, selectedFloor, selectedFacade]);

  useEffect(() => {
    setSelectedApartment(null);
  }, [selectedBlock, selectedFloor, selectedFacade]);

  return (
    <Card className="p-4 w-full">
      <h3 className="text-lg font-semibold mb-2">Daire Seçimi</h3>

      <Input
        placeholder="Daire ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />

      <div className="flex gap-2 mb-4">
        <Select onValueChange={(val) => setSelectedBlock(val)} value={selectedBlock}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Blok" />
          </SelectTrigger>
          <SelectContent>
            {blocks.map((block) => (
              <SelectItem key={block} value={block}>
                {block}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setSelectedFloor(val)} value={selectedFloor}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Kat" />
          </SelectTrigger>
          <SelectContent>
            {floors.map((floor) => (
              <SelectItem key={floor} value={floor}>
                {floor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setSelectedFacade(val)} value={selectedFacade}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Cephe" />
          </SelectTrigger>
          <SelectContent>
            {facades.map((facade) => (
              <SelectItem key={facade} value={facade}>
                {facade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 max-h-[250px] overflow-auto">
        {filtered.map((a, i) => (
          <button
            key={i}
            onClick={() => {
              if (selectedApartment?.id === a.id) {
                setSelectedApartment(null);
                setSelectedBlock("Tümü");
                setSelectedFloor("Tümü");
                setSelectedFacade("Tümü");
              } else {
                setSelectedApartment(a);
              }
            }}
            className={`text-left p-2 rounded border ${
              selectedApartment?.id === a.id
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-100"
            }`}
          >
            <strong>Daire:</strong> {a.block} - {a.floor} - {a.facade}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground">Sonuç bulunamadı.</p>
        )}
      </div>

      {selectedApartment && (
        <div className="mt-4">
          <strong>Seçilen Daire:</strong> {selectedApartment.block} - {selectedApartment.floor} - {selectedApartment.facade}
        </div>
      )}
    </Card>
  );
}
