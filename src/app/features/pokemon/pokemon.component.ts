import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  
    @Input()
    pokemon: Pokemon | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
  getCurrentHpPercents(): number {
    if (typeof this.pokemon === "undefined") {
      return 0;
    }
    return this.pokemon!.currentLife / this.pokemon!.maxLife * 100;
  }

}
