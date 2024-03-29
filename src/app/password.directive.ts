
import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective {
  private shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.setAttribute('class', 'password-toggle');
    span.innerHTML = `Show password    `;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
    this.el.nativeElement.setAttribute('type', 'password');
  }

  toggle(span: HTMLElement) {
    this.shown = !this.shown;
    if (this.shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide password    ';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Show password    ';
    }
  }

}
