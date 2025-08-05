"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { ChevronRightIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Draw = {
  id: string;
  name: string;
  groups: {
    id: string;
    name: string;
    persons: string[];
    apartments: string[];
  }[];
};

export function List() {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedDraws = localStorage.getItem("draw");
    if (storedDraws) {
      try {
        const parsedDraws = JSON.parse(storedDraws) as Draw[];
        setDraws(parsedDraws);
      } catch (error) {
        console.error("Veri çözümleme hatası:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    const updated = draws.filter((item) => item.id !== id);
    setDraws(updated);
    localStorage.setItem("draw", JSON.stringify(updated));
  };

  const handleAddClick = () => {
    router.push("/new-draw");
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Kura Listesi</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kura Adı</TableHead>
            <TableHead>Grup Adı</TableHead>
            <TableHead>Daire</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ) : (
            draws.map((item) => {
              const totalApartments = item.groups.reduce(
                (sum, g) => sum + g.apartments.length,
                0
              );
              const totalPersons = item.groups.reduce(
                (sum, g) => sum + g.persons.length,
                0
              );

              const isDummy = item.id === "2025-haziran";
              const groupName = item.id === "2025-haziran" ? "Arnavutköy" : item.groups[0]?.name ?? "-";
              
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{groupName}</TableCell>
                  <TableCell>
                    {totalApartments} daire / {totalPersons} kişi
                  </TableCell>
                  <TableCell>
                  <Link
                 href={`/draw/${item.id}`}
                 className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-accent"
                 > Detaya Git <ChevronRightIcon className="ml-1 h-4 w-4" />
                 </Link>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="text-red-500">
                          Sil
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Kura Sil</DialogTitle>
                        </DialogHeader>
                        <p>Bu kurayı silmek istediğinize emin misiniz?</p>
                        <DialogFooter className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Vazgeç</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            Evet, Sil
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <div className="flex items-center gap-2">
        <Button onClick={handleAddClick}>Kura Ekle</Button>
      </div>
    </div>
  );
}
