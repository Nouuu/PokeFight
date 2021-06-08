import {Component} from '@angular/core';
import {Pokemon} from './models/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PokeFight';
  pokemon1: Pokemon;
  pokemon2: Pokemon;


  constructor() {
    this.pokemon1 = new Pokemon({name: 'Pikachu', speed: 40, life: 60, attack: 12});
    this.pokemon2 = new Pokemon({name: 'Bulbizarre', speed: 30, life: 100, attack: 10});
  }
}
