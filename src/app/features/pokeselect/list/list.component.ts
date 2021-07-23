import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon} from 'src/app/models/Pokemon';
import {PokebuildService} from 'src/app/utils/pokebuild.service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private pokebuild: PokebuildService) {
  }

  pokemons: Pokemon[] = [];
  pokemonsFiltered: Pokemon[] = [];
  pokemonSelectioned: Pokemon[] = [];

  searchInput = new FormControl('')

  ngOnInit(): void {
    this.setPokemons().subscribe(() => {
      console.log('ready');
    });
  }

  setPokemons(): Observable<void> {
    return new Observable((observer) => {
      this.pokebuild.getPokelist(151).subscribe((pokeList) => {
        this.pokemons = pokeList;
        this.pokemonsFiltered = pokeList;
      });
    });
  }

  selectPokemon(index: number): void {
    this.pokemonSelectioned.push(this.pokemonsFiltered[index]);
  }

  removePokemon(removedPokemon: Pokemon) {
    this.pokemonSelectioned = this.pokemonSelectioned.filter(
      (poke) => poke != removedPokemon
    );
  }

  onSearch() {
    console.log(this.searchInput.value);
    const value = this.searchInput.value.toLowerCase();
    this.pokemonsFiltered = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().indexOf(value) >= 0)
  }
}
