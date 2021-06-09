import {Component, OnInit} from '@angular/core';
import {Pokemon} from './models/Pokemon';
import {Logs} from './models/BattleLog';
import {Pokebuild} from './utils/pokebuild';
import {Arena} from './utils/fight';


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
  arena: Arena | undefined;


  constructor(private pokebuild: Pokebuild) {
  }

  async getPokemon(): Promise<void> {
    this.pokemon1 = await this.pokebuild.getPokemonFromPokedex('alakazam');
    this.pokemon2 = await this.pokebuild.getPokemonFromPokedex('gengar');
    
  }

  async ngOnInit(): Promise<void> {
    await this.getPokemon();
    this.logs = new Logs();
    this.arena = new Arena();
    this.onStartFight();
  }

  onStartFight(): void {
    if (this.pokemon1 && this.pokemon2 && this.logs && this.arena) {
      this.arena.fightArena(this.pokemon1, this.pokemon2, this.logs);
    } else {
      console.error('Can\'t start fight !');
    }
  }
}
