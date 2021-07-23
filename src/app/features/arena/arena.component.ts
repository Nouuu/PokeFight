import {Component, OnInit} from '@angular/core';
import {PokebuildService} from '../../utils/pokebuild.service';
import {FightService} from '../../utils/fight.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit {
  title = 'PokeFight';

  constructor(
    private pokebuild: PokebuildService,
    public fightService: FightService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const pokemon1 = this.route.snapshot.params.poke1;
    const pokemon2 = this.route.snapshot.params.poke2;
    this.setPokemons(pokemon1, pokemon2).subscribe(() => {
      console.log('ready');
      this.fightService.fightArena();
    });
    // this.fightService.fightArena();
  }

  setPokemons(pokemon1: string, pokemon2: string): Observable<void> {
    return new Observable((observer) => {
      this.pokebuild.getPokemonFromPokedex(pokemon1).subscribe((pok1) => {
        this.pokebuild.getPokemonFromPokedex(pokemon2).subscribe((pok2) => {
          if (pok1 && pok2) {
            this.fightService.setPokemons(pok1, pok2);
            observer.next();
            observer.complete();
          } else {
            throw new Error('Failed to build pokemons');
          }
        }, err => {
          this.router.navigate(['/']);
        });
      }, err => {
        this.router.navigate(['/']);
      });
    });
  }
}
