import {Pokemon} from '../models/Pokemon';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {MoveProps} from "../models/Move";
import {PokeAPIResponse, PokeAPIResponseMove, PokeAPIResponsePokemonMove} from "../models/PokeAPIResponse";


@Injectable()
export class PokebuildService {

  private customPokemons: Pokemon[] = [];


  constructor(private httpClient: HttpClient) {
  }

  addCustomPokemon(pokemon: Pokemon) {
    this.customPokemons.push(pokemon);
  }

  getCustomPokemons(): Pokemon[] {
    return this.customPokemons;
  }

  getPokemonFromPokedex(name: string): Observable<Pokemon | undefined> {
    if (name.trim().length === 0) {
      return new Observable(observer => {
        observer.next(undefined);
        observer.unsubscribe();
      });
    }

    const customPokemons = this.customPokemons.find(pokemon => pokemon.name === name);
    if (customPokemons !== undefined) {
      return new Observable(observer => {
        observer.next(customPokemons);
        observer.complete();
      });
    }

    return this.httpClient.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/' + name)
      .pipe(
        catchError(() => {
          throw new Error('Pokemon not found');
        }),
        map((pokemonFromApi): { pokemon: Pokemon, moves: PokeAPIResponsePokemonMove[] } => {
          const speed: number | undefined = pokemonFromApi.stats.find((element) => {
            return element.stat.name === 'speed';
          })?.base_stat;

          const attack: number | undefined = pokemonFromApi.stats.find((element) => {
            return element.stat.name === 'attack';
          })?.base_stat;

          const maxLife: number | undefined = pokemonFromApi.stats.find((element) => {
            return element.stat.name === 'hp';
          })?.base_stat;

          if (!speed || !attack || !maxLife) {
            throw new Error('Can\'t found all pokemon properties for ' + name)
          }

          const types: string[] = pokemonFromApi.types.map((el) => el.type.name);

          const imgUrl = `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`;

          return {
            pokemon: new Pokemon({name, speed, attack, maxLife, imgUrl, types, moves: []}),
            moves: pokemonFromApi.moves
          };
        }),
        mergeMap((data: { pokemon: Pokemon, moves: PokeAPIResponsePokemonMove[] }): Observable<Pokemon> =>
          this.setMovesFromPokedex(data.pokemon, data.moves))
      );
    /*
        const pokemonFromApi: any = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + name).toPromise().catch(() => {
          return undefined;
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
    */
  }

  setMovesFromPokedex(pokemon: Pokemon, pokemonMoves: PokeAPIResponsePokemonMove[], choosenMoves: MoveProps[] = []): Observable<Pokemon> {
    const getRandomMove = (pokeMoves: PokeAPIResponsePokemonMove[]) => {
      const index = Math.floor(Math.random() * pokemonMoves.length);
      return pokeMoves[index].move;
    };
    if (choosenMoves.length < 4 && pokemonMoves.length > 0) {
      return this.httpClient.get<PokeAPIResponseMove>(getRandomMove(pokemonMoves).url)
        .pipe(
          map((move): { pokemon: Pokemon, pokemonMoves: PokeAPIResponsePokemonMove[], choosenMoves: MoveProps[] } => {
            if (move?.power) {
              choosenMoves.push({name: move.name, accuracy: move.accuracy, power: move.power, type: move.type.name});
            }
            pokemonMoves = pokemonMoves.filter((moveItem) => {
              return move.name !== moveItem.move.name;
            });
            return {
              pokemon,
              pokemonMoves,
              choosenMoves
            }
          }),
          mergeMap((data: { pokemon: Pokemon, pokemonMoves: PokeAPIResponsePokemonMove[], choosenMoves: MoveProps[] }): Observable<Pokemon> =>
            this.setMovesFromPokedex(data.pokemon, data.pokemonMoves, data.choosenMoves)
          ));
    }
    pokemon.moves = choosenMoves;
    return new Observable(observer => {
      observer.next(pokemon);
      observer.complete();
    });
    /*
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
    */
  }

  getPokelist(limit: number): Observable<Pokemon[]> {
    return this.httpClient.get<{ count: number, results: { name: string, url: string }[] }>('https://pokeapi.co/api/v2/pokemon?limit=' + limit)
      .pipe(
        map((result): Pokemon[] => {
          const pokelist: Pokemon[] = [];
          for (const data of result.results) {
            this.getPokemonFromPokedexLight(data.url).subscribe((pokemon) => pokelist.push(pokemon));
          }
          return pokelist;
        })
      )
  }

  getPokemonFromPokedexLight(url: string): Observable<Pokemon> {
    return this.httpClient.get<PokeAPIResponse>(url)
      .pipe(
        catchError(() => {
          throw new Error('Pokemon not found');
        }),
        map((pokemonFromApi): Pokemon => {
          const name: string = pokemonFromApi.name;

          const imgUrl = `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`;

          return new Pokemon({name, imgUrl, moves: [], types: [], attack: 0, speed: 0, maxLife: 0});
        }));
  }

}
