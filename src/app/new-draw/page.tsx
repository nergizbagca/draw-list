"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function NewDrawPage() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [draw, setDraw] = useState("");
  const [persons, setPersons] = useState<string[]>([""]);
  const [apartments, setApartments] = useState<string[]>([""]);
  const router = useRouter();

  const handleSave = () => {
    const id = slugify(draw);

    const newDraw = {
      id,
      name: draw,
      createdAt: new Date().toISOString(),
      groups: [
        {
          id: slugify(group),
          name: group,
          persons,
          apartments,
        },
      ],
    };

    const stored = localStorage.getItem("draw");
    const draws = stored ? JSON.parse(stored) : [];
    const updated = [...draws, newDraw];

    localStorage.setItem("draw", JSON.stringify(updated));
    router.push(`/draw/${id}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleAddPerson = () => {
    setPersons([...persons, ""]);
  };

  const handleRemovePerson = (index: number) => {
    setPersons(persons.filter((_, i) => i !== index));
  };

  const handleAddApartment = () => {
    setApartments([...apartments, ""]);
  };

  const handleRemoveApartment = (index: number) => {
    setApartments(apartments.filter((_, i) => i !== index));
  };

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
          <h1 className="text-3xl font-bold mb-6">Yeni Kura Oluştur</h1>
        </div>

        <input
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="Grup adını girin"
          className="border p-2 rounded w-full mb-4"
        />

        <input
          value={draw}
          onChange={(e) => setDraw(e.target.value)}
          placeholder="Kura adını girin"
          className="border p-2 rounded w-full mb-4"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bina adı girin"
          className="border p-2 rounded w-full mb-4"
        />

        {}
        <div className="mb-4">
          <h2 className="font-bold">Kişileri Ekleyin</h2>
          {persons.map((person, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={person}
                onChange={(e) => {
                  const updatedPersons = [...persons];
                  updatedPersons[index] = e.target.value;
                  setPersons(updatedPersons);
                }}
                placeholder={`Kişi ${index + 1}`}
                className="border p-2 rounded w-full"
              />
              <Button
                variant="ghost"
                onClick={() => handleRemovePerson(index)}
                className="bg-red-500 text-white"
              >
                X
              </Button>
            </div>
          ))}
          <Button onClick={handleAddPerson}>Yeni Kişi Ekle</Button>
        </div>

        {}
        <div className="mb-4">
          <h2 className="font-bold">Daireleri Ekleyin</h2>
          {apartments.map((apartment, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={apartment}
                onChange={(e) => {
                  const updatedApartments = [...apartments];
                  updatedApartments[index] = e.target.value;
                  setApartments(updatedApartments);
                }}
                placeholder={`Daire ${index + 1}`}
                className="border p-2 rounded w-full"
              />
              <Button
                variant="ghost"
                onClick={() => handleRemoveApartment(index)}
                className="bg-red-500 text-white"
              >
                X
              </Button>
            </div>
          ))}
          <Button onClick={handleAddApartment}>Yeni Daire Ekle</Button>
        </div>

        <Button onClick={handleSave}>Kaydet</Button>
      </div>
    </div>
  );
}
