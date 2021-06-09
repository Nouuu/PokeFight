import {Pokemon} from '../models/Pokemon';
import {FightService} from '../utils/fight.service';
import {Logs} from '../models/BattleLog';
import {TestBed} from '@angular/core/testing';


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

const logs: Logs = new Logs();

describe('Test determine pokemon first attacker function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService]
    });
  });

  describe('When pokemon don\'t have same speed', () => {
    it('should return Pikachu when Pikachu 90 speed attack Carapuce 43 speed', () => {
      const arena: FightService = TestBed.get(FightService);
      arena.setPaused(false);
      expect(arena.determinefirstAttacker(pikachu, carapuce)).toBe(pikachu);
    });
    it('should return Carapuce when Pikachu 90 speed attack Carapuce 100 speed', () => {
      const arena: FightService = TestBed.get(FightService);
      arena.setPaused(false);
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
      const arena: FightService = TestBed.get(FightService);
      arena.setPaused(false);
      expect(arena.determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(pikachu);
    });
    it('Should return carapuce (2nd pokemon) when rand <= 0.5', () => {
      const arena: FightService = TestBed.get(FightService);
      arena.setPaused(false);
      randomMock = () => 0.5;
      expect(arena.determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(carapuce);
    });
  });
});

describe('Test pokemon fight Arena function', () => {
  const mockIntervalMS = 10;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService]
    });
  });
  afterEach(() => {
    // Initial state
    carapuce.speed = 43;
    carapuce.currentLife = 44;
    pikachu.speed = 90;
    pikachu.currentLife = 35;
  });

  it('Should return as winner pikachu when carapuce has no chance', async () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    carapuce.currentLife = 1;
    expect(await arena.fightArena(pikachu, carapuce, logs, mockIntervalMS)).toBe(pikachu);
  });

  it('Should return as winner carapuce when pikachu has no chance on long fight', async () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    carapuce.currentLife = 1000;
    expect(await arena.fightArena(pikachu, carapuce, logs, mockIntervalMS, false)).toBe(carapuce);
  });

  it('Should throw error if one of pokemon is dead', async () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    carapuce.currentLife = 0;
    await expect(async () => {
      await arena.fightArena(pikachu, carapuce, logs);
    }).rejects.toThrow('One or both pokemon is / are dead so can\'t fight');
  });

});

describe('Test is any pokemon dead function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService]
    });
  });
  afterEach(() => {
    // Initial state
    carapuce.speed = 43;
    carapuce.currentLife = 44;
    pikachu.speed = 90;
    pikachu.currentLife = 35;
  });

  it('should return true if pikachu dead', () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    pikachu.currentLife = 0;
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
  });

  it('should return true if squirtle dead', () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    carapuce.currentLife = 0;
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
  });

  it('should return true if both are dead', () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    pikachu.currentLife = 0;
    carapuce.currentLife = 0;
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
  });
  it('should return false if both are alive', () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    expect(arena.isAnyPokemonDead(pikachu, carapuce)).toBeFalsy();
  });
});

describe('Test attack interval function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService]
    });
  });
  afterEach(() => {
    // Initial state
    carapuce.speed = 43;
    carapuce.currentLife = 44;
    pikachu.speed = 90;
    pikachu.currentLife = 35;
  });

  it('should take squirtle to 0 hp when pikachu attack first', async () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    carapuce.currentLife = 10;
    await arena.startAttackInterval(pikachu, pikachu, carapuce, 10, logs, false);
    expect(carapuce.currentLife).toBe(0);
  });

  it('should take pikachu to 0 hp when squirtle has to many life attack first', async () => {
    const arena: FightService = TestBed.get(FightService);
    arena.setPaused(false);
    carapuce.currentLife = 3000;
    await arena.startAttackInterval(pikachu, pikachu, carapuce, 10, logs, false);
    expect(pikachu.currentLife).toBe(0);
  });
});
