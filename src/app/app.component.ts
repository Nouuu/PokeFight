import {Component, OnInit} from '@angular/core';
import {Pokemon} from './models/Pokemon';
import {Logs} from './models/BattleLog';
import {PokebuildService} from './utils/pokebuild.service';
import {FightService} from './utils/fight.service';


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
  arena: FightService | undefined;


  constructor(private pokebuild: PokebuildService) {
  }

  async getPokemon(): Promise<void> {
    this.pokemon1 = await this.pokebuild.getPokemonFromPokedex('pikachu');
    this.pokemon2 = await this.pokebuild.getPokemonFromPokedex('eevee');
  }

  async ngOnInit(): Promise<void> {
    await this.getPokemon();
    this.logs = new Logs();
    this.arena = new FightService();
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
