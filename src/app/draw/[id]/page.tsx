"use client";
import { slugify } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

type Draw = {
  id: string;
  name: string;
  createdAt: string;
  groups: {
    id: string;
    name: string;
    persons: string[];
    apartments: string[];
  }[];
};

export default function DrawDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [draw, setDraw] = useState<Draw | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<Draw["groups"]>([]);


  useEffect(() => {
    const storedDraws = localStorage.getItem("draw");
    if (storedDraws) {
      const parsedDraws: Draw[] = JSON.parse(storedDraws);
      const found = parsedDraws.find((d) => d.id === id);

      if (found) {
        setDraw(found);
        setFilteredGroups(found.groups);
      }

      setLoading(false);
    }
  }, [id]);

  const filterGroups = () => {
    if (!draw) return [];
    return draw.groups.filter((group) =>
      group.persons.some((person) =>
        person.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredGroups(draw?.groups || []);
    } else {
      setFilteredGroups(filterGroups());
    }
  }, [searchTerm, draw]);

  const handleBack = () => {
    router.back();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (!draw && !loading) return <div>Kura bulunamadı.</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
        <div className="flex gap-2 mb-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-3xl font-bold mb-6">Kura Detayı</h1>
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Adı</TableCell>
              <TableCell>
                {loading ? <Skeleton className="h-6 w-40" /> : draw?.name}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-6 mb-4">
          <input
            type="text"
            placeholder="Kişi arayın..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 w-full border rounded-md"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Gruplar</h2>
          {loading ? (
            <Skeleton className="h-6 w-40 mt-2" />
          ) : filteredGroups.length === 0 ? (
            <div>Arama sonucu bulunamadı.</div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.id} className="mt-4">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <Table className="mt-2">
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">Kişiler</TableCell>
                      <TableCell>
                        {group.persons.length > 0
                          ? group.persons.join(", ")
                          : "Henüz eklenmedi"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Daireler</TableCell>
                      <TableCell>
                        {group.apartments.length > 0
                          ? group.apartments.join(", ")
                          : "Henüz eklenmedi"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
