import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import {Pokemon} from "../../models/Pokemon";
import {LogDirective} from "../log/log.directive";

const carapuce: Pokemon = new Pokemon({
  name: 'squirtle',
  speed: 43,
  attack: 48,
  maxLife: 44,
  imgUrl: '',
  types: [],
  moves: [{ name: 'frappe', power: 50, accuracy: 100, type: 'normal' }],
});

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonComponent, LogDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = carapuce;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
