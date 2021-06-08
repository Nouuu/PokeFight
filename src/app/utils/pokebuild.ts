import {Pokemon} from '../models/Pokemon';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class Pokebuild {


  constructor(private httpClient: HttpClient) {
  }

  async getPokemonFromPokedex(name: string): Promise<Pokemon | undefined> {
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

    const imgUrl = `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`;

    return new Pokemon({name, speed, attack, maxLife, imgUrl, moves:[]});
  }

}
