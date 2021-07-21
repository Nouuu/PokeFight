import { Component, OnInit } from '@angular/core';
import { PokebuildService } from './utils/pokebuild.service';
import { FightService } from './utils/fight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PokeFight';
  pokemon1: Pokemon | undefined;
  pokemon2: Pokemon | undefined;
  logs: Logs | undefined;
  arena: Arena | undefined;

  constructor(
    private pokebuild: PokebuildService,
    public fightService: FightService
  ) {}

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

  async setPokemons(): Promise<void> {
    const pok1 = await this.pokebuild.getPokemonFromPokedex('dragonite');
    const pok2 = await this.pokebuild.getPokemonFromPokedex('garchomp');
    if (pok1 && pok2) {
      this.fightService.setPokemons(pok1, pok2);
    } else {
      console.error('Can\'t start fight !');
    }
  }
}
