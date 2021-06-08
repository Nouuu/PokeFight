import {Pokemon} from '../models/Pokemon';
import {Pokebuild} from '../utils/pokebuild';
import {TestBed} from '@angular/core/testing';


const pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, life: 35});
const carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, life: 44});

// Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test pokebuild from API', () => {
  describe('When a valid pokemon name is provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [Pokebuild]
      });
    });
    it('should return pikachu pokemon with API stats', async () => {
      const pokeBuild: Pokebuild = TestBed.inject(Pokebuild);
      expect(await pokeBuild.getPokemonFromPokedex('pikachu')).toEqual(pikachu);
    });
    it('should return squirtle pokemon with API stats', async () => {
      const pokeBuild: Pokebuild = TestBed.inject(Pokebuild);
      expect(await pokeBuild.getPokemonFromPokedex('squirtle')).toEqual(carapuce);
    });

    it('should return null when empty name', async () => {
      const pokeBuild: Pokebuild = TestBed.inject(Pokebuild);
      expect(await pokeBuild.getPokemonFromPokedex('')).toBeNull();
    });

    it('should return null when unknown name', async () => {
      const pokeBuild: Pokebuild = TestBed.inject(Pokebuild);
      expect(await pokeBuild.getPokemonFromPokedex('unknown')).toBeNull();
    });
  });

});
