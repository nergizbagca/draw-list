"use client";

import { useEffect, useState } from "react";
import { Person } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  persons: Person[];
  onMerge: (mergedPerson: Person) => void;
  selectedPersonIds: string[];
  onSelectPerson: (id: string) => void;
};

export default function PersonSelector({
  persons,
  onMerge,
  selectedPersonIds,
  onSelectPerson,
}: Props) {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSelection = (id: string) => {
    onSelectPerson(id);
  };

  const handleMerge = () => {
    if (selectedPersonIds.length < 2) return;

    const selectedPersons = persons.filter((p) =>
      selectedPersonIds.includes(p.id)
    );

    const mergedName = selectedPersons.map((p) => p.fullName).join(" / ");

    const mergedPerson: Person = {
      id: Date.now().toString(),
      fullName: mergedName,
      apartment: null,
    };

    onMerge(mergedPerson);
    setIsModalOpen(false);
  };

  const filteredPersons = persons.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border rounded-xl p-4 space-y-4 bg-white shadow-md">
      <Input
        placeholder="Kişi ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <ScrollArea className="h-[300px] pr-2">
        <ul className="space-y-2">
          {filteredPersons.map((person) => (
            <li
              key={person.id}
              className="flex items-center justify-between border p-2 rounded-md"
            >
              <div>
                <p className="font-medium">{person.fullName}</p>
                <p className="text-xs text-gray-500">ID: {person.id}</p>
              </div>
              <Checkbox
                checked={selectedPersonIds.includes(person.id)}
                onCheckedChange={() => toggleSelection(person.id)}
              />
            </li>
          ))}
        </ul>
      </ScrollArea>

      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        disabled={selectedPersonIds.length < 2}
      >
        Kişi Birleştir
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Birleştirilecek Kişiler</DialogTitle>
          </DialogHeader>

          <ul className="space-y-2 max-h-[200px] overflow-y-auto">
            {persons
              .filter((p) => selectedPersonIds.includes(p.id))
              .map((person) => (
                <li
                  key={person.id}
                  className="text-sm border p-2 rounded-md bg-gray-100"
                >
                  {person.fullName}
                </li>
              ))}
          </ul>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleMerge}>Birleştir</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
