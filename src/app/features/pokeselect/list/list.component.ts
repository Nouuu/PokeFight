import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokebuildService } from 'src/app/utils/pokebuild.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private pokebuild: PokebuildService) {}
  pokemons: Pokemon[] = [];
  pokemonSelectioned: Pokemon[] = [];
  ngOnInit(): void {
    this.setPokemons().subscribe(() => {
      console.log('ready');
    });
  }
  setPokemons(): Observable<void> {
    return new Observable((observer) => {
      this.pokebuild.getPokelist(50).subscribe((pokeList) => {
        this.pokemons = pokeList;
      });
    });
  }

  selectPokemon(index: number): void {
    this.pokemonSelectioned.push(this.pokemons[index]);
  }

  removePokemon(removedPokemon: Pokemon) {
    this.pokemonSelectioned = this.pokemonSelectioned.filter(
      (poke) => poke != removedPokemon
    );
  }
}
