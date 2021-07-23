export type PokeAPIResponse = {
  stats: {
    base_stat: number,
    effort: number,
    stat: PokeAPIResponseTypeStat
  }[],
  types: {
    slot: number,
    type: PokeAPIResponseTypeStat
  }[],
  moves: PokeAPIResponsePokemonMove[],
  name: string
}

export type PokeAPIResponseTypeStat = {
  name: string,
  url: string
}

export type PokeAPIResponsePokemonMove = {
  move: PokeAPIResponseTypeStat
}
export type PokeAPIResponseMove = {
  power?: number,
  name: string,
  accuracy: number,
  type: PokeAPIResponseTypeStat
}

export type PokeAPIMoveResponse = {}
