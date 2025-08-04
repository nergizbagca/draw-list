"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Person = {
  id: string;
  fullName: string;
  apartment: string | null;
};

type Props = {
  persons: Person[];
};

export default function PersonSelector({ persons }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [persons]);

  const filteredPersons = useMemo(() => {
    return sortedPersons.filter((p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedPersons, search]);

  const handleSelect = (personId: string) => {
    setSelectedPersons((prev) =>
      prev.includes(personId)
        ? prev.filter((p) => p !== personId)
        : [...prev, personId]
    );
  };

  return (
    <div className="mt-8 space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Input
          type="text"
          placeholder="Kişi ara..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filtre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Hepsi</SelectItem>
            <SelectItem value="selected">Seçilenler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground flex items-center justify-between">
        <span>{filteredPersons.length} kişi listelendi</span>
        <Button size="sm" variant="secondary">
          Kişi Birleştir
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto border rounded p-2 bg-white">
        {filteredPersons.map((person) => {
          const isSelected = selectedPersons.includes(person.id);

          if (filter === "selected" && !isSelected) {
            return null;
          }

          return (
            <div
              key={person.id}
              className="flex items-center justify-between border-b pb-1"
            >
              <div>
                <p className="font-medium">{person.fullName}</p>
                <p className="text-xs text-gray-500">ID: {person.id}</p>
              </div>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSelect(person.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
