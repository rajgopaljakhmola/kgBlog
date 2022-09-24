import { Directive, ElementRef, Input, OnInit } from "@angular/core";
@Directive({
  selector: "[color-dir]"
})
export class ColorDirective {
  @Input() color: string;
  @Input() backcolor: string;
  constructor(private elementRef: ElementRef) {
    this.color=''
    this.backcolor=''
  }

  ngOnInit() {
    if (this.color) {
      if (CSS.supports("color", this.color)) {
        this.elementRef.nativeElement.style.color = this.color;
      } else if (CSS.supports("color", `var(--${this.color})`)) {
        this.elementRef.nativeElement.style.color = `var(--${this.color})`;
      }
    }
    if (this.backcolor) {
      if (CSS.supports("background-color", this.backcolor)) {
        this.elementRef.nativeElement.style.backgroundColor = this.backcolor;
      } else if (CSS.supports("background-color", `var(--${this.backcolor})`)) {
        this.elementRef.nativeElement.style.backgroundColor = this.backcolor;
      }
    }
  }
}
