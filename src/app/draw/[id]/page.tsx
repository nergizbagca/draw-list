"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GroupSelector from "@/components/group/GroupSelector";
import PersonSelector from "@/components/person/PersonSelector";
import ApartmentSelector from "@/components/apartment/ApartmentSelector";
import { parseApartmentString } from "@/utils/parseApartmentString";

import type { Draw, Group } from "@/lib/types";

export default function DrawDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [draw, setDraw] = useState<Draw | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  useEffect(() => {
    const storedDraws = localStorage.getItem("draw");
    if (storedDraws) {
      const parsed: Draw[] = JSON.parse(storedDraws);
      const found = parsed.find((d) => d.id === id);
      if (found) {
        setDraw(found);
      }
    }
  }, [id]);

  if (!draw) return <div className="p-4 text-sm">Kura bulunamadı.</div>;

  const parsedApartments = selectedGroup
    ? selectedGroup.apartments.map((a) => {
        console.log("Ham daire verisi:", a);
        const parsed = parseApartmentString(a);
        console.log("Parse edilmiş:", parsed);
        return parsed;
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-6 max-w-screen-xl">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Geri
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-2">{draw.name}</h1>
      <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
        Eşleştirmek istediğiniz grubu seçin
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <h3 className="text-md font-semibold mb-2">Grup Seç</h3>
          <GroupSelector
            groups={draw.groups}
            onSelect={(g) => setSelectedGroup(g)}
            selectedGroupId={selectedGroup?.id}
          />
        </div>

        {selectedGroup && (
          <div className="border rounded-lg p-4 shadow-sm bg-white space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">
                {selectedGroup.name.replace(/blok/i, "Daire")} —{" "}
                {selectedGroup.persons.length} kişi / {selectedGroup.apartments.length} daire
              </p>

              <PersonSelector
                persons={selectedGroup.persons.map((fullName) => ({
                  id: fullName,
                  fullName,
                }))}
              />
            </div>

            <ApartmentSelector
              apartments={parsedApartments}
              onSelect={(apartment) => {
                console.log("Seçilen daire:", apartment);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
