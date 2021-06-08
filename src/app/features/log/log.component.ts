import { Component, Input, OnInit } from '@angular/core';
import { BattleLog, Logs } from 'src/app/models/BattleLog';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  @Input()
  logs: Logs | undefined;
  constructor() { }

  constructor() {
  }

  ngOnInit(): void {
  }

}
