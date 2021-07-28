import { Pokemon } from '../models/Pokemon';
import { MoveProps } from '../models/Move';
import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { BattleLog } from '../models/BattleLog';
import { interval } from 'rxjs';

@Injectable()
export class FightService {
  paused: boolean;
  pok1: Pokemon | undefined;
  pok2: Pokemon | undefined;

  constructor(private logs: LogService) {
    this.paused = true;
    this.pok1 = undefined;
    this.pok2 = undefined;
  }

  getLogs(): BattleLog[] {
    return this.logs.logs;
  }

  getPokemon1(): Pokemon | undefined {
    return this.pok1;
  }

  getPokemon2(): Pokemon | undefined {
    return this.pok2;
  }

  determinefirstAttacker(random = Math.random): Pokemon {
    if (this.pok1 && this.pok2) {
      if (this.pok1.speed !== this.pok2.speed) {
        return this.pok1.speed > this.pok2.speed ? this.pok1 : this.pok2;
      }
      return random() > 0.5 ? this.pok1 : this.pok2;
    } else {
      throw new Error('Pokemons are undefined');
    }
  }

  async determineAttacker(): Promise<Pokemon> {
    if (this.isAnyPokemonDead()) {
      throw new Error("One or both pokemon is / are dead so can't fight");
    }
    return this.determinefirstAttacker();
  }

  isAnyPokemonDead(): boolean {
    if (this.pok1 && this.pok2) {
      return this.pok1.currentLife === 0 || this.pok2.currentLife === 0;
    } else {
      throw new Error('Pokemons are undefined');
    }
  }

  async startAttackInterval(
    attacker: Pokemon,
    intervalMS: number,
    enableLog: boolean
  ): Promise<void> {
    this.logs.setStartTime(new Date());
    return new Promise<void>((resolve) => {
      const observable = interval(intervalMS).subscribe(() => {
        if (this.pok1 && this.pok2) {
          const victim: Pokemon =
            attacker === this.pok1 ? this.pok2 : this.pok1;
          if (!this.paused) {
            const move: MoveProps =
              attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
            const damage: number = attacker.attackPokemon(victim, move);
            if (enableLog) {
              this.logs.appendLog({
                pokemon: attacker,
                attack: move,
                dealtDamage: damage,
              });
            }
          }

          if (this.isAnyPokemonDead()) {
            observable.unsubscribe();
            resolve();
          }
          if (!this.paused) {
            attacker = victim;
          }
        } else {
          throw new Error('Pokemons are undefined');
        }
      });
      /*const intervall =setInterval(() => {
        if (this.pok1 && this.pok2) {
          const victim: Pokemon = attacker === this.pok1 ? this.pok2 : this.pok1;
          if (!this.paused) {
            const move: MoveProps = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
            const damage: number = attacker.attackPokemon(victim, move);
            if (enableLog) {
              this.logs.appendLog({pokemon: attacker, attack: move, dealtDamage: damage});
            }
          }

          if (this.isAnyPokemonDead()) {
            clearInterval(intervall);
            resolve();
          }
          if (!this.paused) {
            attacker = victim;
          }
        } else {
          throw new Error('Pokemons are undefined');
        }
      }, intervalMS);*/
    });
  }

  setPaused(status: boolean): void {
    this.paused = status;
  }

  isPaused(): boolean {
    return this.paused;
  }

  setPokemons(pok1: Pokemon, pok2: Pokemon): void {
    this.pok1 = pok1;
    this.pok2 = pok2;
  }

  resetArena(): void {
    this.pok1 = undefined;
    this.pok2 = undefined;
    this.paused = true;
    this.logs.resetLogs();
  }

  async fightArena(intervalMS = 1000, enableLog = true): Promise<Pokemon> {
    // this.paused = true;
    this.logs.resetLogs();
    const attacker = await this.determineAttacker();

    if (this.pok1 && this.pok2) {
      await this.startAttackInterval(attacker, intervalMS, enableLog);
      const winner: Pokemon = this.pok1.currentLife > 0 ? this.pok1 : this.pok2;
      if (enableLog) {
        this.logs.setWinner(winner);
      }
      return winner;
    } else {
      throw new Error('Pokemons are undefined');
    }
  }
}
