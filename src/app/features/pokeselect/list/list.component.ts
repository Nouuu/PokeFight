import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor() {}
  pokemons: Pokemon[] = [
    new Pokemon({
      name: 'eevee',
      speed: 55,
      attack: 55,
      maxLife: 55,
      types: [],
      moves: [],
      imgUrl: '',
    }),
    new Pokemon({
      name: 'pikatchu',
      speed: 55,
      attack: 55,
      maxLife: 55,
      types: [],
      moves: [],
      imgUrl: '',
    }),
    new Pokemon({
      name: 'raignet',
      speed: 55,
      attack: 55,
      maxLife: 55,
      types: [],
      moves: [],
      imgUrl: '',
    }),
  ];
  ngOnInit(): void {}
}
