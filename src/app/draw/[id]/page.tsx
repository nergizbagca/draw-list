"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GroupSelector from "@/components/group/GroupSelector";

export default function DrawDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [draw, setDraw] = useState<any | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);

  useEffect(() => {
    const storedDraws = localStorage.getItem("draw");
    if (storedDraws) {
      const parsed = JSON.parse(storedDraws);
      const found = parsed.find((d: any) => d.id === id);
      if (found) {
        setDraw(found);
      }
    }
  }, [id]);

  if (!draw) return <div>Kura bulunamadı.</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
        <div className="flex gap-2 mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Geri
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-4">{draw.name}</h1>
        <h2 className="text-xl font-semibold mb-2">Grup Seçimi</h2>

        <GroupSelector
          groups={draw.groups}
          onSelect={(g) => setSelectedGroup(g)}
          selectedGroupId={selectedGroup?.id}
        />

        {selectedGroup && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Seçilen Grup: {selectedGroup.name.replace(/blok/i, "Daire")}
            </h3>
            <p><strong>Kişi Sayısı:</strong> {selectedGroup.persons.length}</p>
            <p><strong>Daire Sayısı:</strong> {selectedGroup.apartments.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}
