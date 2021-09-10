interface Character {
  created: Date;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
}

interface DataTypes {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Character[];
}

interface LocationTypes {
  created: Date;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
}

interface OriginTypes {
  created: Date;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
}

export { DataTypes, Character, LocationTypes, OriginTypes };
