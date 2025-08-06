import { useState } from "react";
import { Person } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MergePersonsModal from "./MergePersonModal";
import clsx from "clsx";

interface Props {
  persons: Person[];
  selectedPerson: Person | null;
  onSelectPerson: (person: Person | null) => void;
  onCombine: (selected: Person[], mergedName: string) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

export default function PersonSelector({
  persons,
  selectedPerson,
  onSelectPerson,
  onCombine,
  searchTerm,
  onSearchTermChange,
}: Props) {
  const [selectedForMerge, setSelectedForMerge] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePersonSelect = (person: Person) => {
    const alreadySelected = selectedForMerge.some((p) => p.id === person.id);
    const newSelected = alreadySelected
      ? selectedForMerge.filter((p) => p.id !== person.id)
      : [...selectedForMerge, person];

    setSelectedForMerge(newSelected);

    if (selectedPerson?.id === person.id) {
      onSelectPerson(null);
    } else {
      onSelectPerson(person);
    }
  };

  const handleCancelMerge = () => {
    setSelectedForMerge([]);
    onSelectPerson(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="Kişi ara..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />

      <div className="max-h-64 overflow-y-auto border rounded p-2 space-y-1">
        {persons.map((person) => (
          <div
            key={person.id}
            className={clsx(
              "p-2 rounded cursor-pointer border transition-colors",
              selectedForMerge.some((p) => p.id === person.id)
                ? "bg-blue-100 border-blue-500 text-black"
                : "hover:bg-gray-100"
            )}
            onClick={() => togglePersonSelect(person)}
          >
            <div className="font-medium">{person.fullName}</div>
            <div className="text-xs text-gray-500">{person.id}</div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
          disabled={selectedForMerge.length < 2}
        >
          Kişi Birleştir
        </Button>
      </div>

      <MergePersonsModal
        isOpen={isModalOpen}
        selectedPersons={selectedForMerge}
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancelMerge}
        onMerge={(mergedName) => {
          onCombine(selectedForMerge, mergedName);
          setSelectedForMerge([]);
          onSelectPerson(null);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
