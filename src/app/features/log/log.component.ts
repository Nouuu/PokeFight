import {Component, Input, OnInit} from '@angular/core';
import {LogService} from '../../utils/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  constructor(public logs: LogService) {
  }

  ngOnInit(): void {
  }

}
