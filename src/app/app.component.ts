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
  poke1 = new Pokemon({attack: 20, maxLife: 100, name: "evolie", speed: 30});
  poke2 = new Pokemon({attack: 25, maxLife: 120, name: "galopa", speed: 34});
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
