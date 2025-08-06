"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { loadFromLocalStorage } from "@/lib/localStorageUtils";
import { Group, Person, Draw } from "@/lib/types";
import GroupSelector from "@/components/group/GroupSelector";
import PersonSelector from "@/components/person/PersonSelector";
import ApartmentSelector from "@/components/apartment/ApartmentSelector";
import { parseApartmentString } from "@/lib/parseApartmentString";
import { toast } from "sonner";

export default function DrawDetailPage() {
  const params = useParams();
  const drawId = params.id as string;

  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const draw = loadFromLocalStorage(drawId) as Draw;
    if (draw) {
      setGroups(draw.groups);
    }
  }, [drawId]);

  const handleGroupSelect = (groupName: string) => {
    const group = groups.find((g) => g.name === groupName) || null;
    setSelectedGroup(group);
  };

  const handleCombinePersons = (selected: Person[], mergedName: string) => {
    if (!selectedGroup) return;

    const newPerson: Person = {
      id: `${Date.now()}`,
      fullName: mergedName,
    };

    const updatedPersons = [
      ...selectedGroup.persons.filter(
        (p) => !selected.some((sel) => sel.id === p.id)
      ),
      newPerson,
    ];

    const updatedGroup: Group = {
      ...selectedGroup,
      persons: updatedPersons,
    };

    setSelectedGroup(updatedGroup);

    setGroups((prevGroups) =>
      prevGroups.map((g) =>
        g.name === updatedGroup.name ? updatedGroup : g
      )
    );

    toast.success(`${mergedName} oluşturuldu ve kişi listesine eklendi.`);
  };

  const filteredPersons =
    selectedGroup?.persons.filter((p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  return (
    <div className="p-4 space-y-4">
      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          className:
            "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
        })}
      >
        <ArrowLeft className="w-4 h-4" />
        Geri
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Grup Seç</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupSelector
            groups={groups}
            onSelect={handleGroupSelect}
          />
        </CardContent>
      </Card>

      {selectedGroup && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Kişiler</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonSelector
                persons={filteredPersons}
                selectedPerson={selectedPerson}
                onSelectPerson={setSelectedPerson}
                onCombine={handleCombinePersons}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
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
              <p className="text-sm text-muted-foreground">
                Henüz eşleşme yok.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
