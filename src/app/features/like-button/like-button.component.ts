import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit {

  @Input() nbLikes: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  incLikes(): void {
    this.nbLikes++;
  }

}
