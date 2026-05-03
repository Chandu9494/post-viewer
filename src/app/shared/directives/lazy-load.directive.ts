import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() src: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Simple implementation - just set the src directly for now
    // We can add intersection observer later once basic functionality works
    if (this.src) {
      this.el.nativeElement.src = this.src;
    }
  }
}
