import {
  Directive, OnInit, Input, ElementRef
  , OnChanges, SimpleChanges, Renderer2
} from '@angular/core';
import { isNewChange } from '@shared/utils/data.utils';


@Directive ({ selector: '[btn]'})
export class BtnDirective implements OnInit, OnChanges {
  @Input  () btn = '';

  private mainStyle   = 'btn';
  private stylePrefix = 'btn-';

  constructor (
    private element: ElementRef
    , private renderer: Renderer2
  ) {
  }//e constructor


  ngOnInit () {
    this.addClass (this.mainStyle);
  }//e ngOnInit


  ngOnChanges ({ btn }: SimpleChanges) {
    if (btn && isNewChange (btn)) {
      this.applyStyles ();
    }
  }//e ngOnChanges


  addClass (className: string) {
    this.renderer.addClass (this.element.nativeElement, className);
  }//e addClass


  applyStyles () {
    const prefix = this.stylePrefix;
    const styles = this.btn.split (' ').map (style => `${prefix}${style}`)
      .forEach (className => this.addClass (className));
  }//e applyStyles
}
//e class
