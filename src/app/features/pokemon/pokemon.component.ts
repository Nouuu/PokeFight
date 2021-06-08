import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  hp: number;
  maxHp: number;
  hpPercents: number;

  constructor() {
    this.hp = 80;
    this.maxHp = 100;
    this.hpPercents = this.hp / this.maxHp * 100;
  }

  ngOnInit(): void {
  }

}
