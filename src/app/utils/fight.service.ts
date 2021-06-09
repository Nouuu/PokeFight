import {Pokemon} from '../models/Pokemon';
import {Logs} from '../models/BattleLog';
import {MoveProps} from '../models/Move';
import {Injectable} from '@angular/core';

@Injectable()
export class FightService {
  paused: boolean;


  constructor() {
    this.paused = true;
  }

  determinefirstAttacker(pok1: Pokemon, pok2: Pokemon, random = Math.random): Pokemon {
    if (pok1.speed !== pok2.speed) {
      return pok1.speed > pok2.speed ? pok1 : pok2;
    }
    return random() > 0.5 ? pok1 : pok2;
  }

  async determineAttacker(pok1: Pokemon, pok2: Pokemon): Promise<Pokemon> {
    if (this.isAnyPokemonDead(pok1, pok2)) {
      throw new Error('One or both pokemon is / are dead so can\'t fight');
    }

    return this.determinefirstAttacker(pok1, pok2);
  }

  isAnyPokemonDead(pok1: Pokemon, pok2: Pokemon): boolean {
    return pok1.currentLife === 0 || pok2.currentLife === 0;
  }

  async startAttackInterval(attacker: Pokemon, pok1: Pokemon, pok2: Pokemon,
                            intervalMS: number, logs: Logs, enableLog: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        const victim: Pokemon = attacker === pok1 ? pok2 : pok1;
        if (!this.paused) {
          const move: MoveProps = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
          const damage: number = attacker.attackPokemon(victim, move);
          if (enableLog) {
            logs.appendLog({pokemon: attacker, attack: move, dealtDamage: damage});
          }
        }

        if (this.isAnyPokemonDead(pok1, pok2)) {
          clearInterval(interval);
          resolve();
        }
        if (!this.paused) {
          attacker = victim;
        }
      }, intervalMS);
    });
  }

  setPaused(status: boolean): void {
    this.paused = status;
  }

  isPaused(): boolean {
    return this.paused;
  }

  async fightArena(pok1: Pokemon, pok2: Pokemon, logs: Logs, intervalMS = 1000, enableLog = true): Promise<Pokemon> {
    const attacker = await this.determineAttacker(pok1, pok2);

    await this.startAttackInterval(attacker, pok1, pok2, intervalMS, logs, enableLog);
    const winner: Pokemon = pok1.currentLife > 0 ? pok1 : pok2;
    if (enableLog) {
      logs.setWinner(winner);
    }
    return winner;
  }

}
