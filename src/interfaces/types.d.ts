interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

interface DataTypes {
  info: {
    count: number
    next: string | null
    pages: number
    prev: string | null
  }
  results: Character[]
}

interface LocationTypes {
  created: Date
  dimension: string
  id: number
  name: string
  residents: string[]
  type: string
}

interface OriginTypes {
  created: Date
  dimension: string
  id: number
  name: string
  residents: string[]
  type: string
}

interface EpisodeTypes {
  air_date: string
  characters: string[]
  created: Date
  episode: string
  id: number
  name: string
  url: string
}

export { DataTypes, Character, LocationTypes, OriginTypes, EpisodeTypes }
