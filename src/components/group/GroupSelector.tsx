"use client";
import React from "react"; 

type Group = {
  id: string;
  name: string;
  persons: string[];
  apartments: string[];
  matches?: { person: string; apartment: string }[];
};

type Props = {
  groups: Group[];
  onSelect: (group: Group) => void;
  selectedGroupId?: string;
};

export default function GroupSelector({ groups, onSelect, selectedGroupId }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => {
        const matched = group.matches?.length || 0;
        const total = group.persons.length;
        const remaining = total - matched;

        return (
          <div
            key={group.id}
            className={`cursor-pointer rounded border p-4 transition-all ${
              selectedGroupId === group.id
                ? "border-blue-500 bg-blue-100"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelect(group)}
          >
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <p>Toplam: {total}</p>
            <p>Eşleştirilen: {matched}</p>
            <p>Kalan: {remaining}</p>
          </div>
        );
      })}
    </div>
  );
}
