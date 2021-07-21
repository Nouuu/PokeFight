import {MoveProps} from './Move';

export type PokemonProps = {
  name: string;
  speed: number;
  maxLife: number;
  attack: number;
  imgUrl: string;
  types: string[];
  moves: MoveProps[];
};

export class Pokemon implements PokemonProps {
  name: string;
  speed: number;
  attack: number;
  maxLife: number;
  currentLife: number;
  imgUrl: string;
  types: string[];
  moves: MoveProps[];

  constructor(props: PokemonProps) {
    this.name = props.name;
    this.speed = props.speed;
    this.attack = props.attack;
    this.maxLife = props.maxLife;
    this.currentLife = props.maxLife;
    this.imgUrl = props.imgUrl;
    this.types = props.types;
    this.moves = props.moves;
  }

  attackPokemon(other: Pokemon, move: MoveProps, random = Math.random): number {
    if (this.currentLife > 0) {
      let multiplier = 1;
      if (random() > 0.9) {
        multiplier = 2;
      }
      const damage = (((this.attack + move.power) / 30) * multiplier);
      other.currentLife = Math.max(0, other.currentLife - damage);
      return damage;
    }
    return 0;
  }
}
