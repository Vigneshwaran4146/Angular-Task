import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]'
})
export class ChangeBackgroundDirective implements OnChanges {

  @Input('appChangeBackground') backgroundColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backgroundColor']) {
      this.changeBackgroundColor(this.backgroundColor);
    }
  }

  private changeBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

}
