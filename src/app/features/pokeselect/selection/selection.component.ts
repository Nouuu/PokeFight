import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  constructor() {
  }
  @ViewChild(HTMLAudioElement)
  frameMusic!: HTMLAudioElement;

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

  ngOnInit(): void {
  }
}
