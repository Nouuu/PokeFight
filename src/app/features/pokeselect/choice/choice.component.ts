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
  startSoundEffect: HTMLAudioElement;
  @Output()
  removePokemon = new EventEmitter<Pokemon>();
  constructor(private router: Router) {
    this.startSoundEffect = new Audio('../../assets/start_sound_effect.mp3');
    this.startSoundEffect.load();
    this.startSoundEffect.loop = false;
    this.startSoundEffect.volume = 0.050;
  }

  ngOnInit(): void {
  }

  gotoBattle(): void {
    if (this.poke1 && this.poke2) {
      this.startSoundEffect.play();
      this.router.navigate(['fight', this.poke1.name, this.poke2.name]);
    }
  }
}
