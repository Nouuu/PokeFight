import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appElementType]'
})
export class LogDirective implements OnInit {
  @Input()
  appElementType = '';

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.appElementType);
  }
}
