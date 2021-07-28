import { Pokemon } from '../models/Pokemon';
import { FightService } from '../utils/fight.service';
import { TestBed } from '@angular/core/testing';
import { LogService } from '../utils/log.service';

const carapuce: Pokemon = new Pokemon({
  name: 'squirtle',
  speed: 43,
  attack: 48,
  maxLife: 44,
  imgUrl: '',
  types: [],
  moves: [{ name: 'frappe', power: 50, accuracy: 100, type: 'normal' }],
});
// Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
const pikachu: Pokemon = new Pokemon({
  name: 'pikachu',
  speed: 90,
  attack: 55,
  maxLife: 35,
  imgUrl: '',
  types: [],
  moves: [{ name: 'frappe', power: 50, accuracy: 100, type: 'normal' }],
});
// Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test determine pokemon first attacker function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService, LogService],
    });
  });

  describe("When pokemon don't have same speed", () => {
    it('should return Pikachu when Pikachu 90 speed attack Carapuce 43 speed', () => {
      const arena: FightService = TestBed.inject(FightService);
      arena.setPaused(false);
      arena.setPokemons(pikachu, carapuce);
      expect(arena.determinefirstAttacker()).toBe(pikachu);
    });
    it('should return Carapuce when Pikachu 90 speed attack Carapuce 100 speed', () => {
      const arena: FightService = TestBed.inject(FightService);
      arena.setPaused(false);
      arena.setPokemons(pikachu, carapuce);
      carapuce.speed = 100;
      expect(arena.determinefirstAttacker()).toBe(carapuce);
    });
  });
  describe('When pokemon have same speed', () => {
    let randomMock: () => number;
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
      const arena: FightService = TestBed.inject(FightService);
      arena.setPaused(false);
      arena.setPokemons(pikachu, carapuce);
      expect(arena.determinefirstAttacker(randomMock)).toBe(pikachu);
    });
    it('Should return carapuce (2nd pokemon) when rand <= 0.5', () => {
      const arena: FightService = TestBed.inject(FightService);
      arena.setPaused(false);
      arena.setPokemons(pikachu, carapuce);
      randomMock = () => 0.5;
      expect(arena.determinefirstAttacker(randomMock)).toBe(carapuce);
    });
  });
});

describe('Test pokemon fight Arena function', () => {
  const mockIntervalMS = 5;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService, LogService],
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
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    carapuce.currentLife = 1;
    expect(await arena.fightArena(mockIntervalMS)).toBe(pikachu);
  });

  it('Should return as winner carapuce when pikachu has no chance on long fight', async () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    carapuce.currentLife = 100;
    expect(await arena.fightArena(mockIntervalMS, false)).toBe(carapuce);
  });

  it('Should throw error if one of pokemon is dead', async () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    carapuce.currentLife = 0;
    await expect(async () => {
      await arena.fightArena();
    }).rejects.toThrow("One or both pokemon is / are dead so can't fight");
  });
});

describe('Test is any pokemon dead function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService, LogService],
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
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    pikachu.currentLife = 0;
    expect(arena.isAnyPokemonDead()).toBeTruthy();
  });

  it('should return true if squirtle dead', () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    carapuce.currentLife = 0;
    expect(arena.isAnyPokemonDead()).toBeTruthy();
  });

  it('should return true if both are dead', () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    pikachu.currentLife = 0;
    carapuce.currentLife = 0;
    expect(arena.isAnyPokemonDead()).toBeTruthy();
  });
  it('should return false if both are alive', () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    expect(arena.isAnyPokemonDead()).toBeFalsy();
  });
});

describe('Test attack interval function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightService, LogService],
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
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    carapuce.currentLife = 10;
    await arena.startAttackInterval(pikachu, 10, false);
    expect(carapuce.currentLife).toBe(0);
  });

  it('should take pikachu to 0 hp when squirtle has to many life attack first', async () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    carapuce.currentLife = 3000;
    await arena.startAttackInterval(pikachu, 10, false);
    expect(pikachu.currentLife).toBe(0);
  });

  it('should take pikachu and squirtle', () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    arena.setPokemons(pikachu, carapuce);
    expect(arena.getPokemon1()).toBe(pikachu);
    expect(arena.getPokemon2()).toBe(carapuce);
    expect(arena.getLogs()).toBe([]);
  });

  it('should throw an error cause of bad definition', () => {
    const arena: FightService = TestBed.inject(FightService);
    arena.setPaused(false);
    expect(arena.determinefirstAttacker()).toThrowError();
  });
});
