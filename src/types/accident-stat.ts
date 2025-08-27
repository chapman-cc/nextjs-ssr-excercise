export type Casualty = {
  age: number;
  class: string;
  severity: string;
  mode: string;
  ageBand: string;
};

export type Vehicle = {
  type: "Car";
};

export type AccidentStat = {
  id: number;
  lat: number;
  lon: number;
  location: string;
  date: string;
  severity: string;
  borough: string;
  casualties: Casualty[];
  vehicles: Vehicle[];
};
