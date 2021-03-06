import {Pokemon} from '../models/Pokemon';
import {MoveProps} from '../models/Move';


const carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, maxLife: 44, imgUrl: '', types: [], moves: []});
// Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
const pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, maxLife: 35, imgUrl: '', types: [], moves: []});
// Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }
const move: MoveProps = {name: 'frappe', power: 10, accuracy: 100, type: 'normal'};

describe('Test pokemon attack other Pokemon function', () => {
  let randomMock: (() => number);
  beforeEach(() => {
    randomMock = () => 0.5;
    carapuce.currentLife = 44;
    pikachu.currentLife = 35;
  });

  describe('When pikachu is alive and attack carapuce', () => {

    it('should remove pv to carapuce when pikachu attack carapuce with 55 attack', () => {
      pikachu.attackPokemon(carapuce, move, randomMock);
      expect(carapuce.currentLife).toBeCloseTo(41.83);
    });

    it('should remove 55 pv to carapuce and KO when pikachu attack carapuce with 55 attack and critic', () => {
      carapuce.currentLife = 2;

      randomMock = () => 1;
      pikachu.attackPokemon(carapuce, move, randomMock);
      expect(carapuce.currentLife).toBe(0);
    });
  });
  describe('When pikachu attacker is dead and attack carapuce', () => {
    it('should not remove any pv to carapuce because attacker is KO', () => {
      pikachu.currentLife = 0;
      pikachu.attackPokemon(carapuce, move, randomMock);
      expect(carapuce.currentLife).toBe(44);
    });
  });
});
