import {Component, OnInit} from '@angular/core';
import {Pokemon} from './models/Pokemon';
import {Logs} from './models/BattleLog';
import {Pokebuild} from './utils/pokebuild';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PokeFight';
  pokemon1: Pokemon | undefined;
  pokemon2: Pokemon | undefined;
  logs: Logs | undefined;


  constructor(private pokebuild: Pokebuild) {
  }

  async getPokemon(): Promise<void> {
    console.log(await this.pokebuild.getPokemonFromPokedex('pikachu'));
  }

  ngOnInit(): void {
    this.getPokemon();
    this.pokemon1 = new Pokemon({name: 'Pikachu', speed: 40, life: 60, attack: 12});
    this.pokemon2 = new Pokemon({name: 'Bulbizarre', speed: 30, life: 100, attack: 10});
    this.logs = new Logs();
  }
}
