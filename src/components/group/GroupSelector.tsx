import { Card, CardContent } from "@/components/ui/card";
import { Group, CombinedPerson } from "@/lib/types";

interface GroupSelectorProps {
  groups: Group[];
  onSelect: (groupName: string) => void;
  combinedPersons?: CombinedPerson[]; 
}

export default function GroupSelector({
  groups,
  onSelect,
  combinedPersons = [], 
}: GroupSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {groups.map((group) => {
        const total = group.persons.length;

        const matched = combinedPersons.filter((cp) =>
          cp.persons.some((p) =>
            group.persons.some((gp) => gp.id === p.id)
          )
        ).length;

        const remaining = total - matched;

        return (
          <Card
            key={group.name}
            onClick={() => onSelect(group.name)}
            className="cursor-pointer hover:shadow-md transition-shadow p-3"
          >
            <CardContent className="space-y-1 text-sm">
              <div className="font-semibold text-center">{group.name}</div>
              <div>Toplam: {total}</div>
              <div>Eşleştirilen: {matched}</div>
              <div>Kalan: {remaining}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
