"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Person } from "@/lib/types";

interface Props {
  isOpen: boolean;
  selectedPersons: Person[];
  onClose: () => void;
  onCancel: () => void;
  onMerge: (mergedName: string) => void;
}

export default function MergePersonsModal({
  isOpen,
  selectedPersons,
  onClose,
  onCancel,
  onMerge,
}: Props) {
  const mergedName = selectedPersons.map(p => p.fullName).join(" + ");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Birleştirmek istiyor musunuz?</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          <strong>{mergedName}</strong> kişilerini birleştirmek üzeresiniz.
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            İptal
          </Button>
          <Button onClick={() => onMerge(mergedName)}>
            Birleştir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
