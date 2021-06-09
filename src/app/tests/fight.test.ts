import {Pokemon} from '../models/Pokemon';
import {Arena} from '../utils/fight';
import {Logs} from '../models/BattleLog';


const carapuce: Pokemon = new Pokemon({
  name: 'squirtle',
  speed: 43,
  attack: 48,
  maxLife: 44,
  imgUrl: '',
  types: [],
  moves: [{name: 'frappe', power: 10, accuracy: 100, type: 'normal'}]
});
// Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
const pikachu: Pokemon = new Pokemon({
  name: 'pikachu',
  speed: 90,
  attack: 55,
  maxLife: 35,
  imgUrl: '',
  types: [],
  moves: [{name: 'frappe', power: 10, accuracy: 100, type: 'normal'}]
});
// Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

const arena: Arena = new Arena();
arena.setPaused(false);
const logs: Logs = new Logs();

describe('Test determine pokemon first attacker function', () => {

  describe('When pokemon don\'t have same speed', () => {
    it('should return Pikachu when Pikachu 90 speed attack Carapuce 43 speed', () => {
      expect(arena.determinefirstAttacker(pikachu, carapuce)).toBe(pikachu);
    });
    it('should return Carapuce when Pikachu 90 speed attack Carapuce 100 speed', () => {
      carapuce.speed = 100;
      expect(arena.determinefirstAttacker(pikachu, carapuce)).toBe(carapuce);
    });
  });
  describe('When pokemon have same speed', () => {
    let randomMock: (() => number);
    beforeEach(() => {
      randomMock = () => 0.89;
      carapuce.speed = 15;
      pikachu.speed = 15;
    });
    afterEach(() => {
      carapuce.speed = 43;
      pikachu.speed = 90;
    });
    it('Should return pikachu (1st pokemon) when rand > 0.5', () => {
      expect(arena.determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(pikachu);
    });
    it('Should return carapuce (2nd pokemon) when rand <= 0.5', () => {
      randomMock = () => 0.5;
      expect(arena.determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(carapuce);
    });
  });
});

describe('Test pokemon fight Arena function', () => {
  const mockIntervalMS = 10;

  afterEach(() => {
    // Initial state
    carapuce.speed = 43;
    carapuce.currentLife = 44;
    pikachu.speed = 90;
    pikachu.currentLife = 35;
  });

  it('Should return as winner pikachu when carapuce has no chance', async () => {
    carapuce.currentLife = 1;
    expect(await arena.fightArena(pikachu, carapuce, logs, mockIntervalMS)).toBe(pikachu);
  });

  it('Should return as winner carapuce when pikachu has no chance on long fight', async () => {
    carapuce.currentLife = 1000;
    expect(await arena.fightArena(pikachu, carapuce, logs, mockIntervalMS, false)).toBe(carapuce);
  });

  it('Should throw error if one of pokemon is dead', async () => {
    carapuce.currentLife = 0;
    await expect(async () => {
      await arena.fightArena(pikachu, carapuce, logs);
    }).rejects.toThrow('One or both pokemon is / are dead so can\'t fight');
  });

});

describe('Test is any pokemon dead function', () => {
  afterEach(() => {
    // Initial state
    carapuce.speed = 43;
    carapuce.currentLife = 44;
    pikachu.speed = 90;
    pikachu.currentLife = 35;
  });

  it('should return true if pikachu dead', () => {
    pikachu.currentLife = 0;
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
  });

  it('should return true if squirtle dead', () => {
    carapuce.currentLife = 0;
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
  });

  it('should return true if both are dead', () => {
    pikachu.currentLife = 0;
    carapuce.currentLife = 0;
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
  });
  it('should return false if both are alive', () => {
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeFalsy();
  });
});

describe('Test attack interval function', () => {
  afterEach(() => {
    // Initial state
    carapuce.speed = 43;
    carapuce.currentLife = 44;
    pikachu.speed = 90;
    pikachu.currentLife = 35;
  });

  it('should take squirtle to 0 hp when pikachu attack first', async () => {
    carapuce.currentLife = 10;
    await arena.startAttackInterval(pikachu, pikachu, carapuce, 10, logs, false);
    expect(carapuce.currentLife).toBe(0);
  });

  it('should take pikachu to 0 hp when squirtle has to many life attack first', async () => {
    carapuce.currentLife = 3000;
    await arena.startAttackInterval(pikachu, pikachu, carapuce, 10, logs, false);
    expect(pikachu.currentLife).toBe(0);
  });
});
