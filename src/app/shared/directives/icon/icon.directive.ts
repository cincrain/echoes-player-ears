import { Directive, OnInit, Input, ElementRef
  , OnChanges, SimpleChanges, Renderer2
} from '@angular/core';
import { isNewChange } from '@shared/utils/data.utils';


const ICON_BASE_CLASSNAME = 'fa';
const ICON_LIB_PREFIX     = 'fa';


@Directive ({
  selector: 'icon, [appIcon]'
})
export class IconDirective implements OnInit, OnChanges {
  @Input  () name = '';

  constructor (
    private el: ElementRef
    , private renderer: Renderer2
  ) {
  }//e constructor


  ngOnInit() {
    const { name } = this;
    let classes    = [ICON_BASE_CLASSNAME];
    if (name) {
      classes = [...classes, ...this.createIconStyles (name)];
    }
    this.setClass (classes);
  }//e ngOnInit


  ngOnChanges ({ name }: SimpleChanges) {
    if (name && isNewChange (name)) {
      this.createIconStyles (name.currentValue);
    }
  }//e ngOnChanges


  createIconStyles (names: string): string[] {
    return names.split (' ')
      .map (name => `${ICON_LIB_PREFIX}-${name}`)
  }//e createIconStyles


  setClass (names: string[]) {
    names.forEach (name => 
      this.renderer.addClass (this.el.nativeElement, name)
    );
  }//e setClass
}
//e class
