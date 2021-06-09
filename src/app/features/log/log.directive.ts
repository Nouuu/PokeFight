import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[type]'
})
export class LogDirective {
  @Input()
  type: string = '';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.classList.add(this.type);
  }
}
