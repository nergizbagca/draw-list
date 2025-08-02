"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [draw, setDraw] = useState<Draw[]>([]);
  const [loading, setLoading] = useState(true);
  const [skeletonRowCount, setSkeletonRowCount] = useState(2);

  const cleanDraws = (data: any[]): Draw[] => {
    return data.map((draw) => ({
      ...draw,
      name: draw.name?.replace(/\t/g, " "),
      groups: draw.groups.map((group: any) => ({
        ...group,
        name: group.name?.replace(/\t/g, " "),
        persons: group.persons.map((p: string) => p.replace(/\t/g, " ")),
        apartments: group.apartments.map((a: string) => a.replace(/\t/g, " ")),
      })),
    }));
  };

  useEffect(() => {
    const storedDraws = localStorage.getItem("draw");
    if (storedDraws) {
      const parsedDraws = JSON.parse(storedDraws);
      const cleaned = cleanDraws(parsedDraws);
      setDraw(cleaned);
      setSkeletonRowCount(cleaned.length || 2);
      setLoading(false);
    } else {
      fetch("/mock_draws.json")
        .then((res) => res.json())
        .then((data) => {
          const cleaned = cleanDraws(data);
          localStorage.setItem("draw", JSON.stringify(cleaned));
          setDraw(cleaned);
          setSkeletonRowCount(cleaned.length || 2);
        })
        .catch((error) => {
          console.error("Dummy veri yüklenemedi:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const router = useRouter();
  const handleAddClick = () => {
    router.push("/new-draw");
  };
  
  const handleDelete = (id: string) => {
    const updatedDraws = draw.filter((item) => item.id !== id);
    setDraw(updatedDraws);
    localStorage.setItem("draw", JSON.stringify(updatedDraws));
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
          {loading
            ? Array.from({ length: skeletonRowCount }).map((_, index) => (
                <TableRow key={index} className="h-12">
                  <TableCell>
                    <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                </TableRow>
              ))
            : draw.map((item) =>
                item.groups.map((group) => (
                  <TableRow key={`${item.id}-${group.id}`}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                      {group.apartments.length} daire / {group.persons.length} kişi
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="cursor-pointer gap-1"
                        onClick={() => router.push(`/draw/${item.id}`)}
                      >
                        Detaya git <ChevronRightIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="cursor-pointer text-red-500"
                          >
                            Sil
                          </Button>
                        </DialogTrigger>
                        <DialogContent aria-describedby="dialog-description">
                          <DialogHeader>
                            <DialogTitle id="dialog-description">
                              Kurayı silmek istediğinize emin misiniz?
                            </DialogTitle>
                          </DialogHeader>
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
                ))
              )}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button onClick={handleAddClick}>Kura Ekle</Button>
      </div>
    </div>
  );
}
