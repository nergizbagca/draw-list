"use client";

import { useState, useMemo } from "react";
import { ApartmentParsed } from "@/lib/types";
import { Input } from "@/components/ui/input"; 

type Props = {
  apartments: ApartmentParsed[];
  onSelect?: (apartment: ApartmentParsed | null) => void;
};

export default function ApartmentSelector({ apartments, onSelect }: Props) {
  const [blockFilter, setBlockFilter] = useState("");
  const [floorFilter, setFloorFilter] = useState("");
  const [facadeFilter, setFacadeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<ApartmentParsed | null>(null);

  const blocks = useMemo(
    () => Array.from(new Set(apartments.map((a) => a.block))),
    [apartments]
  );
  const floors = useMemo(
    () => Array.from(new Set(apartments.map((a) => a.floor))),
    [apartments]
  );
  const facades = useMemo(
    () => Array.from(new Set(apartments.map((a) => a.facade))),
    [apartments]
  );

  const filtered = useMemo(() => {
    return apartments
      .filter(
        (a) =>
          (!blockFilter || a.block === blockFilter) &&
          (!floorFilter || a.floor === floorFilter) &&
          (!facadeFilter || a.facade === facadeFilter)
      )
      .filter((a) => {
        const values = Object.values(a).join(" ").toLowerCase();
        return values.includes(searchQuery.toLowerCase());
      });
  }, [apartments, blockFilter, floorFilter, facadeFilter, searchQuery]);

  const handleSelect = (a: ApartmentParsed) => {
    const newSelected = a.id === selected?.id ? null : a;
    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Daire ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      <div className="flex flex-wrap gap-2">
        <select
          value={blockFilter}
          onChange={(e) => setBlockFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Blok</option>
          {blocks.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={floorFilter}
          onChange={(e) => setFloorFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Kat</option>
          {floors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          value={facadeFilter}
          onChange={(e) => setFacadeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Cephe</option>
          {facades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((a) => {
          const isSelected = selected?.id === a.id;
          return (
            <button
              key={a.id}
              onClick={() => handleSelect(a)}
              className={`p-3 border rounded text-left hover:bg-accent transition ${
                isSelected ? "bg-accent" : ""
              }`}
            >
              <div className="text-sm font-medium">Daire</div>
              <div className="text-xs text-muted-foreground">
                {a.block} - {a.floor} - {a.facade}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-4 p-3 border rounded">
          <div className="text-sm font-semibold">Seçilen Daire</div>
          <div className="text-sm">
            {selected.block} - {selected.floor} - {selected.facade}
          </div>
        </div>
      )}
    </div>
  );
}
