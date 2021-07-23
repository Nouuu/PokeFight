import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements OnInit {
  @Input()
  poke1?: Pokemon;
  @Input()
  poke2?: Pokemon;

  @Output()
  removePokemon = new EventEmitter<Pokemon>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoBattle(): void {
    if (this.poke1 && this.poke2) {
      this.router.navigate(['fight', this.poke1.name, this.poke2.name]);
    }
  }
}
