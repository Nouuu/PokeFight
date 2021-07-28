import { Pokemon } from '../models/Pokemon';
import { PokebuildService } from '../utils/pokebuild.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {take} from 'rxjs/operators';

const pikachu: Pokemon = new Pokemon({
  name: 'pikachu',
  speed: 90,
  attack: 55,
  maxLife: 35,
  imgUrl: 'https://img.pokemondb.net/sprites/home/normal/pikachu.png',
  types: ['electric'],
  moves: [],
});
const carapuce: Pokemon = new Pokemon({
  name: 'squirtle',
  speed: 43,
  attack: 48,
  maxLife: 44,
  imgUrl: 'https://img.pokemondb.net/sprites/home/normal/squirtle.png',
  types: ['water'],
  moves: [],
});

// Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test pokebuild from API', () => {
  describe('When a valid pokemon name is provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [PokebuildService],
        imports: [HttpClientModule],
      });
    });
    it('should return pikachu pokemon with API stats', () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      pokeBuild.getPokemonFromPokedex('pikachu').subscribe((pikaFromApi) => {
        expect(pikaFromApi).toEqual(pikachu);
      });
    });
    it('should return squirtle pokemon with API stats', () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      pokeBuild
        .getPokemonFromPokedex('squirtle')
        .subscribe((squirtleFromApi) => {
          expect(squirtleFromApi).toEqual(carapuce);
        });
    });

    it('should return null when empty name', () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      pokeBuild.getPokemonFromPokedex('').subscribe((noPokemon) => {
        expect(noPokemon).toBeUndefined();
      });
    });

    it('should return null when unknown name', () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      pokeBuild.getPokemonFromPokedex('unknown').subscribe((noPokemon) => {
        expect(noPokemon).toBeUndefined();
      });
    });

    it('should only have moves with a power greater than 0', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokemonFromPokedex('squirtle')
        .pipe(take(1))
        .toPromise())?.moves.every(move => move.power > 0)).toBeTruthy();
    });
    it('should every move s power should not be undefined', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokemonFromPokedex('magikarp')
        .pipe(take(1))
        .toPromise())?.moves.every(move => move.power !== undefined)).toBeTruthy();
    });
    it('should have more than 0 moves', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokemonFromPokedex('magikarp')
        .pipe(take(1))
        .toPromise())?.moves.length).toBeGreaterThan(0);
    });
    it('should have a maximum of 4 moves', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokemonFromPokedex('charmander')
        .pipe(take(1))
        .toPromise())?.moves.length).toBeLessThanOrEqual(4);
    });
  });
  describe('When getting a list of playable pokemons', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [PokebuildService],
        imports: [HttpClientModule]
      });
    });
    it('should return a maximum of 10 pokemons', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokelist(10)
        .pipe(take(1)).toPromise()).length).toBeLessThanOrEqual(10);
    });
    it('should return a list of non null or undefined pokemons', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokelist(10)
        .pipe(take(1)).toPromise()).every(pokemon => pokemon)).toBeTruthy();
    });
    it('should return a list of non null or undefined pokemons', async () => {
      const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
      expect((await pokeBuild.getPokelist(10)
        .pipe(take(1)).toPromise()).every(pokemon => pokemon)).toBeTruthy();
    });

    describe('When getting an existing pokemon from pokedex light', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [PokebuildService],
          imports: [HttpClientModule]
        });
      });
      it('should have a name and an image', async () => {
        const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
        const pokemon = await pokeBuild.getPokemonFromPokedexLight('https://pokeapi.co/api/v2/pokemon/pikachu').pipe(take(1)).toPromise();
        expect(pokemon.imgUrl).toBeTruthy();
        expect(pokemon.name).toBeTruthy();
      });
    });
    describe('When getting a non existant pokemon from pokedex light', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [PokebuildService],
          imports: [HttpClientModule]
        });
      });
      it('should throw an error', async () => {
        const pokeBuild: PokebuildService = TestBed.inject(PokebuildService);
        await expect(async () => {
          await pokeBuild.getPokemonFromPokedexLight('https://pokeapi.co/api/v2/pokemon/notExistant').pipe(take(1)).toPromise();
        }).rejects.toThrow('Pokemon not found');
      });
    });
  });
});
