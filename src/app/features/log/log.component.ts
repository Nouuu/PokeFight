import { Component, Input, OnInit } from '@angular/core';
import { BattleLog } from 'src/app/models/BattleLog';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  @Input()
  battleLogs: BattleLog[]= [{
    attackerName:"Ivysaur",
    attackName: "poison-powder",
    dealtDamage:12
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
