"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Person } from "@/lib/types";

type Props = {
  persons: Person[];
  onMerge: (merged: Person, removedIds: string[]) => void;
  onClose: () => void;
};

export default function MergePersonsModal({ persons, onMerge, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredPersons = useMemo(() => {
    return persons.filter((p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, persons]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleMerge = () => {
    if (selectedIds.length < 2) return;

    const selectedNames = persons
      .filter((p) => selectedIds.includes(p.id))
      .map((p) => p.fullName);

    const mergedName = selectedNames.join(" / ");
    const newPerson: Person = {
      id: `${Date.now()}`,
      fullName: mergedName,
    };

    onMerge(newPerson, selectedIds); 
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kişi Birleştir</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Kişi ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="max-h-60 overflow-y-auto mt-2 space-y-2">
          {filteredPersons.map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{p.fullName}</p>
                <p className="text-xs text-muted-foreground">ID: {p.id}</p>
              </div>
              <input
                type="checkbox"
                checked={selectedIds.includes(p.id)}
                onChange={() => handleToggle(p.id)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            İptal
          </Button>
          <Button
            onClick={handleMerge}
            disabled={selectedIds.length < 2}
          >
            Birleştir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
