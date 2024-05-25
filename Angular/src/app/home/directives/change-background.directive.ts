import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]'
})
export class ChangeBackgroundDirective implements OnChanges {

  // Input property to set the background color
  @Input('appChangeBackground') backgroundColor!: string;

  // Constructor with dependency injection of ElementRef and Renderer2
  constructor(private elment: ElementRef, private renderer: Renderer2) { }

  /**
   * Lifecycle hook ngOnChanges
   * @param changes - The changes detected
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['backgroundColor']) {
      this.renderer.setStyle(this.elment.nativeElement, 'backgroundColor', this.backgroundColor); 
    }
  } 
}
