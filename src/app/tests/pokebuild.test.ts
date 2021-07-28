import { Pokemon } from '../models/Pokemon';
import { PokebuildService } from '../utils/pokebuild.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

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
  });
});
