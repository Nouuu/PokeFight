import {Component, OnInit} from '@angular/core';
import {PokebuildService} from './utils/pokebuild.service';
import {FightService} from './utils/fight.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PokeFight';

  constructor(
    private pokebuild: PokebuildService,
    public fightService: FightService
  ) {}

  ngOnInit(): void {
    this.setPokemons()
      .subscribe(() => {
        console.log('ready')
        this.fightService.fightArena();
      });
    // this.fightService.fightArena();
  }

  setPokemons(): Observable<void> {
    return new Observable(observer => {
      this.pokebuild.getPokemonFromPokedex('pikachu').subscribe(pok1 => {
        this.pokebuild.getPokemonFromPokedex('eevee').subscribe(pok2 => {
          if (pok1 && pok2) {
            this.fightService.setPokemons(pok1, pok2);
            observer.next();
            observer.complete();
          } else {
            throw new Error('Failed to build pokemons');
          }
        });
      });
    })
  }
}
