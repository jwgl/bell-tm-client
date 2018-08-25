import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[focus]',
})
export class FocusDirective implements OnInit {
    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.focus();
    }

    @HostListener('click')
    focus() {
        setTimeout(() => this.elementRef.nativeElement.focus(), 0);
    }
}
