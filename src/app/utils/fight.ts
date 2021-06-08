import {Pokemon} from '../models/Pokemon';
import {Logs} from '../models/BattleLog';

export function determinefirstAttacker(pok1: Pokemon, pok2: Pokemon, random = Math.random): Pokemon {
  if (pok1.speed !== pok2.speed) {
    return pok1.speed > pok2.speed ? pok1 : pok2;
  }
  return random() > 0.5 ? pok1 : pok2;
}

async function determineAttacker(pok1: Pokemon, pok2: Pokemon): Promise<Pokemon> {
  if (isAnyPokemonDead(pok1, pok2)) {
    throw new Error('One or both pokemon is / are dead so can\'t fight');
  }

  return determinefirstAttacker(pok1, pok2);
}

export function isAnyPokemonDead(pok1: Pokemon, pok2: Pokemon): boolean {
  return pok1.currentLife === 0 || pok2.currentLife === 0;
}

export async function startAttackInterval(attacker: Pokemon, pok1: Pokemon, pok2: Pokemon,
                                          intervalMS: number, logs: Logs, enableLog: boolean): Promise<void> {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const victim: Pokemon = attacker === pok1 ? pok2 : pok1;
      const damage: number = attacker.attackPokemon(victim);

      if (enableLog) {
        logs.appendLog({attackerName: attacker.name, attackName: 'frappe', dealtDamage: damage});
      }

      if (isAnyPokemonDead(pok1, pok2)) {
        clearInterval(interval);
        resolve();
      }
      attacker = victim;
    }, intervalMS);
  });
}

export async function fightArena(pok1: Pokemon, pok2: Pokemon, intervalMS = 1000, logs: Logs, enableLog = true): Promise<Pokemon> {
  const attacker = await determineAttacker(pok1, pok2);

  await startAttackInterval(attacker, pok1, pok2, intervalMS, logs, enableLog);
  const winner: Pokemon = pok1.currentLife > 0 ? pok1 : pok2;
  if (enableLog) {
    logs.setWinner(winner);
  }
  return winner;
}
