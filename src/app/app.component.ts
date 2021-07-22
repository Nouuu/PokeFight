import { Component, OnInit } from '@angular/core';
import { PokebuildService } from './utils/pokebuild.service';
import { FightService } from './utils/fight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PokeFight';

  constructor(
    private pokebuild: PokebuildService,
    public fightService: FightService
  ) {}

  ngOnInit(): void {}
}
