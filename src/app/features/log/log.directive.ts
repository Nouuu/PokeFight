import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[type]'
})
export class LogDirective implements OnInit {
  @Input()
  type = '';

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.type);
  }
}
