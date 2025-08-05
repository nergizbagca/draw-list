import { useMemo, useState } from "react";
import { Apartment } from "@/lib/types";

type Props = {
  apartments: Apartment[];
  onSelect: (apartment: Apartment) => void;
};

export default function ApartmentSelector({ apartments, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedFacade, setSelectedFacade] = useState("");

  const customFloorSort = (a: string, b: string) => {
    const normalize = (s: string) => {
      if (s.toLowerCase().includes("zemin")) return 0;
      const num = parseInt(s);
      return isNaN(num) ? 999 : num;
    };
    return normalize(a) - normalize(b);
  };

  const blocks = useMemo(
    () => [...new Set(apartments.map((a) => a.block).filter(Boolean))].sort(),
    [apartments]
  );

  const floors = useMemo(
    () => [...new Set(apartments.map((a) => a.floor).filter(Boolean))].sort(customFloorSort),
    [apartments]
  );

  const facades = useMemo(
    () =>
      [...new Set(apartments.map((a) => a.facade).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, "tr")
      ),
    [apartments]
  );

  const filtered = useMemo(() => {
    return apartments.filter((a) => {
      const matchesSearch = a.raw.toLowerCase().includes(search.toLowerCase());
      const matchesBlock = selectedBlock ? a.block === selectedBlock : true;
      const matchesFloor = selectedFloor ? a.floor === selectedFloor : true;
      const matchesFacade = selectedFacade ? a.facade === selectedFacade : true;
      return matchesSearch && matchesBlock && matchesFloor && matchesFacade;
    });
  }, [apartments, search, selectedBlock, selectedFloor, selectedFacade]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Daire Seç</h2>
      <input
        type="text"
        placeholder="Daire ara..."
        className="border px-2 py-1 rounded w-full mb-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2 mb-2">
        <select
          className="border px-2 py-1 rounded"
          value={selectedBlock}
          onChange={(e) => setSelectedBlock(e.target.value)}
        >
          <option value="">Blok</option>
          {blocks.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
        >
          <option value="">Kat</option>
          {floors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={selectedFacade}
          onChange={(e) => setSelectedFacade(e.target.value)}
        >
          <option value="">Cephe</option>
          {facades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ul className="border rounded p-2 max-h-64 overflow-y-auto">
        {filtered.map((a) => (
          <li
            key={a.id}
            className="p-1 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(a)}
          >
            {a.raw}
          </li>
        ))}
      </ul>
    </div>
  );
}
