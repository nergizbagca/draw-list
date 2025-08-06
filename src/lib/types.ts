export type Option = {
  label: string;
  value: string;
};

export type Person = {
  id: string;
  fullName: string;
  apartment?: ApartmentParsed | null;
};

export type Apartment = string;

export type ApartmentParsed = {
  id: string;
  block: string;
  floor: string;
  type: string;
  code: string;
  facade: string;
  raw: string; 
};

export type Match = {
  person: string;
  apartment: string;
};

export interface Group {
  id: string;
  name: string;
  persons: Person[];
  apartments: Apartment[]; 
  matches?: Match[];
}

export type Draw = {
  id: string;
  name: string;
  groups: Group[];
};

export type MergedPerson = {
  id: string;
  fullName: string;
  apartment?: ApartmentParsed | null;
};