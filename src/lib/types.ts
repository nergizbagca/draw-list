export type Option = {
  label: string;
  value: string;
};

export type Person = {
  id: string;
  fullName: string;
};

export type Apartment = {
  id: string;
  block: string;
  floor: string;
  type: string;
  code: string;
  facade: string;
  raw: string;
};

export type ParsedApartment = Omit<Apartment, "raw">;

export type Match = {
  person: string;
  apartment: string;
};

export type Group = {
  id: string;
  name: string;
  persons: string[];
  apartments: string[];
  matches?: Match[];
};

export type Draw = {
  id: string;
  name: string;
  groups: Group[];
};
