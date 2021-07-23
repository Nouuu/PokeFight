import { Component, OnInit } from '@angular/core';
import { PokebuildService } from '../../utils/pokebuild.service';
import { FightService } from '../../utils/fight.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit {
  title = 'PokeFight';
  battleSoundEffect: HTMLAudioElement;

  constructor(
    private pokebuild: PokebuildService,
    public fightService: FightService
  ) {
    this.battleSoundEffect = new Audio('../../assets/battle_sound_effect.mp3');
    this.battleSoundEffect.load();
    this.battleSoundEffect.loop = true;
    this.battleSoundEffect.volume = 0.025;
  }

  async ngOnInit(): Promise<void> {
    this.setPokemons().subscribe(() => {
      console.log('ready');
      this.fightService.fightArena();
    });
    // this.fightService.fightArena();
  }

  toggleBattle(): void{
    this.fightService.setPaused(!this.fightService.isPaused());
    if (!this.fightService.isPaused()){
      this.battleSoundEffect.play().then();
    }
    else{
      this.battleSoundEffect.pause();
    }
  }

  setPokemons(): Observable<void> {
    return new Observable((observer) => {
      this.pokebuild.getPokemonFromPokedex('pikachu').subscribe((pok1) => {
        this.pokebuild.getPokemonFromPokedex('eevee').subscribe((pok2) => {
          if (pok1 && pok2) {
            this.fightService.setPokemons(pok1, pok2);
            observer.next();
            observer.complete();
          } else {
            throw new Error('Failed to build pokemons');
          }
        });
      });
    });
  }
}
