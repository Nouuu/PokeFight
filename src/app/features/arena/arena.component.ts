import { Component, OnInit } from '@angular/core';
import { PokebuildService } from '../../utils/pokebuild.service';
import { FightService } from '../../utils/fight.service';
@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit {
  title = 'PokeFight';

  constructor(
    private pokebuild: PokebuildService,
    public fightService: FightService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setPokemons();
    this.fightService.fightArena();
  }

  async setPokemons(): Promise<void> {
    const pok1 = await this.pokebuild.getPokemonFromPokedex('pikachu');
    const pok2 = await this.pokebuild.getPokemonFromPokedex('eevee');
    if (pok1 && pok2) {
      this.fightService.setPokemons(pok1, pok2);
    } else {
      throw new Error('Failed to build pokemons');
    }
  }
}
