import {Pokemon} from './Pokemon';
import {MoveProps} from './Move';

export type BattleLog = {
  pokemon: Pokemon;
  attack: MoveProps;
  dealtDamage: number;
};
