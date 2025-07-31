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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [skeletonRowCount, setSkeletonRowCount] = useState(0);

  useEffect(() => {
    const storedDraws = localStorage.getItem("draw");
    const parsedDraws = storedDraws ? JSON.parse(storedDraws) : [];

    setSkeletonRowCount(parsedDraws.length > 0 ? parsedDraws.length : 2);

    setTimeout(() => {
      if (storedDraws) {
        setDraw(parsedDraws);
      } else {
        const defaultData = [
          {
            id: "kura-1",
            name: "Mart	2024	Kurası",
            groups: [
              {
                id: "group-1",
                name: "2+1	A	Blok",
                persons: ["Ahmet	Yılmaz", "Merve	Gök"],
                apartments: [
                  "A	Blok	- 1.KAT	- 2+1	A	(GD)",
                  "A	Blok	- 2.KAT	- 2+1	A	(KB)",
                ],
              },
            ],
          },
          {
            id: "kura-2",
            name: "Nisan	2025	Kurası",
            groups: [
              {
                id: "group-2",
                name: "2+1	A	Blok",
                persons: ["Ahmet	Yılmaz", "Merve	Gök"],
                apartments: [
                  "A	Blok	- 1.KAT	- 2+1	A	(GD)",
                  "A	Blok	- 2.KAT	- 2+1	A	(KB)",
                ],
              },
            ],
          },
        ];
        localStorage.setItem("draw", JSON.stringify(defaultData));
        setDraw(defaultData);
      }
      setLoading(false);
    }, 1000);
  }, []);

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
                </TableRow>
              ))
            : draw.map((item) =>
                item.groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>{item.id?.toUpperCase()?.replace('-', ' ')}</TableCell>
                    <TableCell>{group.id?.toUpperCase()?.replace('-', ' ')}</TableCell>
                    <TableCell>{group.name}</TableCell>
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
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
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
