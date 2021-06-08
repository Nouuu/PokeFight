import {Pokemon} from './Pokemon';

export type BattleLog = {
  attackerName: string;
  attackName: string;
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
