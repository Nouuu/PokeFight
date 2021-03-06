import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {

  @Input()
  nbLikes = 0;

  constructor() {
  }

  incLikes(): void {
    this.nbLikes++;
  }

}
