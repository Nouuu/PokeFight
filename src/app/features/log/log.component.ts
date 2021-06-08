import {Component, Input, OnInit} from '@angular/core';
import {Logs} from 'src/app/models/BattleLog';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  @Input()
  logs: Logs | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
