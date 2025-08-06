"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getDrawFromStorage, saveDrawToStorage } from "@/lib/storage";
import { Draw, Group } from "@/lib/types";
import { parseApartmentString } from "@/lib/parseApartmentString";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GroupSelector from "@/components/group/GroupSelector";
import PersonSelector from "@/components/person/PersonSelector";
import ApartmentSelector from "@/components/apartment/ApartmentSelector";

export default function DrawDetail() {
  const { id } = useParams<{ id: string }>();
  const [draw, setDraw] = useState<Draw | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedPersonIds, setSelectedPersonIds] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const fetched = getDrawFromStorage(id);
      setDraw(fetched);
      if (fetched?.groups.length) {
        setSelectedGroup(fetched.groups[0]);
      }
    }
  }, [id]);

  useEffect(() => {
    if (draw) {
      console.log("Gruplar:", draw.groups.map((g) => g.id));
    }
  }, [draw]);

  if (!draw || !selectedGroup) return <div>Yükleniyor...</div>;

  return (
    <div className="p-4 space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-accent"
      >
        <ArrowLeft className="w-4 h-4" />
        Geri Dön
      </Link>

      <div>
  <h2 className="text-lg font-semibold mb-2">Grup Seçimi</h2>
  <GroupSelector
    groups={draw.groups}
    selectedGroupId={selectedGroup.id}
    onSelectGroup={(groupId) => {
      const found = draw.groups.find((g) => g.id === groupId);
      if (found) {
        setSelectedGroup(found);
        setSelectedPersonIds([]);
      }
    }}
  />
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Kişiler</CardTitle>
          </CardHeader>
          <CardContent>
            <PersonSelector
              persons={selectedGroup.persons}
              selectedPersonIds={selectedPersonIds}
              onSelectPerson={(id) =>
                setSelectedPersonIds((prev) =>
                  prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
                )
              }
              onMerge={(mergedPerson) => {
                if (!selectedGroup || !draw) return;

                const updatedPersons = selectedGroup.persons
                  .filter((p) => !selectedPersonIds.includes(p.id))
                  .concat(mergedPerson);

                const updatedGroup: Group = {
                  ...selectedGroup,
                  persons: updatedPersons,
                };

                const updatedGroups = draw.groups.map((g) =>
                  g.id === updatedGroup.id ? updatedGroup : g
                );

                const updatedDraw: Draw = {
                  ...draw,
                  groups: updatedGroups,
                };

                setDraw(updatedDraw);
                setSelectedGroup(updatedGroup);
                saveDrawToStorage(updatedDraw);
                setSelectedPersonIds([]);
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daireler</CardTitle>
          </CardHeader>
          <CardContent>
            <ApartmentSelector
              apartments={selectedGroup.apartments.map(parseApartmentString)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eşleşmeler</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Henüz tanımlanmadı.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
