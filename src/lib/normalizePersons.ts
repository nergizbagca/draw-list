import { Person } from "./types";

export function normalizePersons(persons: (string | Person)[]): Person[] {
  return persons.map((p, index) => {
    if (typeof p === "string") {
      return {
        id: `${index}-${p}`,
        fullName: p,
        apartment: null,
      };
    }
    return p;
  });
}
