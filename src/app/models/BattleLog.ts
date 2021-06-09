import {Pokemon} from './Pokemon';
import {MoveProps} from './Move';

export type BattleLog = {
  pokemon: Pokemon;
  attack: MoveProps;
  dealtDamage: number;
};

export class Logs {
  battleLogs: BattleLog[];
  winner: Pokemon | undefined;


  constructor() {
    this.battleLogs = [];
  }

  appendLog(log: BattleLog): void {
    this.battleLogs.push(log);
  }

  setWinner(pokemon: Pokemon): void {
    this.winner = pokemon;
  }

  getWinner(): Pokemon | undefined {
    return this.winner;
  }

  getSize(): number {
    return this.battleLogs.length;
  }

  getLogs(): BattleLog[] {
    return this.battleLogs;
  }

  getLog(index: number): BattleLog {
    return this.battleLogs[Math.max(0, Math.min(this.battleLogs.length - 1, index))];
  }
}
