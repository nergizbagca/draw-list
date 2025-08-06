"use client";

import { Group } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";

type Props = {
  groups: Group[];
  selectedGroupId: string;
  onSelectGroup: (groupId: string) => void;
};

export default function GroupSelector({ groups, selectedGroupId, onSelectGroup }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {groups.map((group) => (
        <Card
          key={group.id}
          onClick={() => onSelectGroup(group.id)}
          className={clsx(
            "cursor-pointer transition-colors border-2",
            group.id === selectedGroupId
              ? "border-blue-500 bg-blue-50"
              : "hover:border-blue-300"
          )}
        >
          <CardHeader className="p-3 text-sm font-medium">{group.name}</CardHeader>
          <CardContent className="p-3 text-xs text-muted-foreground">
            {group.apartments.length} daire / {group.persons.length} kişi
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
