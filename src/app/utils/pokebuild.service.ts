import {Pokemon} from '../models/Pokemon';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MoveProps} from '../models/Move';


@Injectable()
export class PokebuildService {


  constructor(private httpClient: HttpClient) {
  }

  async getPokemonFromPokedex(name: string): Promise<Pokemon | undefined> {
    if (name.trim().length === 0) {
      return undefined;
    }
    const pokemonFromApi: any = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + name).toPromise().catch(() => {
      return null;
    });

    if (!pokemonFromApi) {
      return undefined;
    }

    const speed: number = pokemonFromApi.stats.find((element: any) => {
      return element.stat.name === 'speed';
    }).base_stat;

    const attack: number = pokemonFromApi.stats.find((element: any) => {
      return element.stat.name === 'attack';
    }).base_stat;

    const maxLife: number = pokemonFromApi.stats.find((element: any) => {
      return element.stat.name === 'hp';
    }).base_stat;

    const types: string[] = pokemonFromApi.types.map((el: any) => el.type.name);

    const imgUrl = `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`;

    const pokemon: Pokemon = new Pokemon({name, speed, attack, maxLife, imgUrl, types, moves: []});

    this.setMovesFromPokedex(pokemon, pokemonFromApi.moves);

    return pokemon;
  }

  async setMovesFromPokedex(pokemon: Pokemon, pokemonMoves: any[]): Promise<void> {
    const getRandomMove = (pokeMoves: any[]) => {
      const index = Math.floor(Math.random() * pokemonMoves.length);
      return pokeMoves[index].move;
    };
    while (pokemon.moves.length < 4 && pokemonMoves.length > 0) {
      const move: any = await this.httpClient.get(getRandomMove(pokemonMoves).url).toPromise().catch(() => {
        return null;
      });
      if (move?.power) {
        pokemon.moves.push({name: move.name, accuracy: move.accuracy, power: move.power, type: move.type.name});
      }
      pokemonMoves = pokemonMoves.filter((moveItem) => {
        return move.name !== moveItem.move.name;
      });
    }
  }

}
