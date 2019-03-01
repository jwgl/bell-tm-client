import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[markdown]',
})
export class MarkdownDirective implements OnChanges {
    @Input()
    options: any;

    @Input('markdown')
    text: string;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        const textObj = changes['text'];
        if (textObj && textObj.currentValue) {
            this.elementRef.nativeElement.innerHTML = (<any>window).markdownit(this.options).render(textObj.currentValue);
        }
    }
}
