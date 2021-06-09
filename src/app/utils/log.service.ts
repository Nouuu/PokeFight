import {Injectable} from '@angular/core';
import {BattleLog} from '../models/BattleLog';
import {Pokemon} from '../models/Pokemon';

@Injectable()
export class LogService {
  logs: BattleLog[];
  winner: Pokemon | undefined;


  constructor() {
    this.logs = [];
  }

  appendLog(log: BattleLog): void {
    this.logs.push(log);
  }

  setWinner(pokemon: Pokemon): void {
    this.winner = pokemon;
  }

  getWinner(): Pokemon | undefined {
    return this.winner;
  }

  getLogs(): BattleLog[] {
    return this.logs;
  }

  getLog(index: number): BattleLog {
    return this.logs[Math.max(0, Math.min(this.logs.length - 1, index))];
  }

  resetLogs(): void {
    this.winner = undefined;
    this.logs = [];
  }


}
