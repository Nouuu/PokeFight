export type PokemonProps = {
  name: string;
  speed: number;
  maxLife: number;
  attack: number;
  imgUrl: string;
};

export class Pokemon implements PokemonProps {
  name: string;
  speed: number;
  attack: number;
  maxLife: number;
  currentLife: number;
  imgUrl: string;

  constructor(props: PokemonProps) {
    this.name = props.name;
    this.speed = props.speed;
    this.attack = props.attack;
    this.maxLife = props.maxLife;
    this.currentLife = props.maxLife;
    this.imgUrl = props.imgUrl;
  }

  attackPokemon(other: Pokemon, random = Math.random): number {
    if (this.maxLife > 0) {
      let multiplier = 1;
      if (random() > 0.9) {
        multiplier = 2;
      }
      const damage = (this.attack / 2) * multiplier;
      other.maxLife = Math.max(0, other.maxLife - damage);
      return damage;
    }
    return 0;
  }
}
