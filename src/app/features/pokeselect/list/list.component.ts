import {Component, Inject, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {Pokemon} from 'src/app/models/Pokemon';
import {PokebuildService} from 'src/app/utils/pokebuild.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {types} from "../../../models/Types";
import {MoveProps} from "../../../models/Move";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  createForm: FormGroup;
  moveForm: FormGroup;

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
    });
    this.moveForm = fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required, Validators.minLength(1)]],
      power: [0, [Validators.required, Validators.min(1)]],
      accuracy: [0, [Validators.required, Validators.min(1)]],
    });
  }

  pokemon: Pokemon[] = [];
  pokemonFiltered: Pokemon[] = [];
  pokemonSelected: Pokemon[] = [];

  searchInput = new FormControl('')

  ngOnInit(): void {
    this.setPokemons().subscribe(() => {
    });
    timer(10000).subscribe(() => {
      this.pokemon = this.pokemon.concat(this.pokebuild.getCustomPokemons());
      this.pokemonFiltered = this.pokemon;
    })
    this.types = types;
  }

  setPokemons(): Observable<void> {
    return new Observable((observer) => {
      this.pokebuild.getPokelist(151).subscribe((pokeList) => {
        this.pokemon = pokeList;
        this.pokemonFiltered = pokeList;
        observer.next();
      });
    });
  }

  selectPokemon(index: number): void {
    this.pokemonSelected.push(this.pokemonFiltered[index]);
  }

  removePokemon(removedPokemon: Pokemon) {
    this.pokemonSelected = this.pokemonSelected.filter(
      (poke) => poke != removedPokemon
    );
  }

  onSearch() {
    console.log(this.searchInput.value);
    const value = this.searchInput.value.toLowerCase();
    this.pokemonFiltered = this.pokemon.filter(pokemon =>
      pokemon.name.toLowerCase().indexOf(value) >= 0)
  }

  onCreatePokemon() {
    const pokemon: Pokemon = new Pokemon({
      name: this.createForm.value.name,
      speed: this.createForm.value.speed,
      attack: this.createForm.value.attack,
      types: this.createForm.value.types,
      maxLife: this.createForm.value.life,
      imgUrl: this.createForm.value.imgUrl,
      moves: this.createForm.value.moves
    });
    this.pokebuild.addCustomPokemon(pokemon);
    this.pokemon.push(pokemon);
    this.pokemonFiltered = this.pokemon;
    this.searchInput.patchValue('');
    // this.createForm.reset();
  }

  onAddMove() {
    const moves: MoveProps[] = this.createForm.value.moves;
    moves.push(this.moveForm.value);
    this.createForm.controls.moves.patchValue(moves);
    // this.moveForm.reset();
  }

  removeMove(move: MoveProps) {
    const moves: MoveProps[] = this.createForm.value.moves.filter((formMove: MoveProps) => formMove.name != move.name);
    this.createForm.controls.moves.patchValue(moves);
  }
}
