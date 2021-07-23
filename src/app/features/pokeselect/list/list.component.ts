import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon} from 'src/app/models/Pokemon';
import {PokebuildService} from 'src/app/utils/pokebuild.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {types} from "../../../models/Types";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  createForm: FormGroup;
  types: string[] = []

  constructor(@Inject(FormBuilder) fb: FormBuilder, private pokebuild: PokebuildService) {
    this.createForm = fb.group({
      name: ['', Validators.required],
      speed: [0, Validators.required],
      attack: [0, Validators.required],
      life: [0, Validators.required],
      imgUrl: ['', Validators.required],
      types: [[], [Validators.required, Validators.minLength(1)]],
      moves: [[], [Validators.required, Validators.minLength(1), Validators.maxLength(4)]]
    })
  }

  pokemons: Pokemon[] = [];
  pokemonsFiltered: Pokemon[] = [];
  pokemonSelectioned: Pokemon[] = [];

  searchInput = new FormControl('')

  ngOnInit(): void {
    this.setPokemons().subscribe(() => {
      console.log('ready');
    });
    this.types = types;
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

  onCreatePokemon() {
    console.log(this.createForm.value);
  }
}
