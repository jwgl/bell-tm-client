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
        const markdown = (window as any).markdownit(this.options);
        this.elementRef.nativeElement.innerHTML = markdown.render(textObj.currentValue);
    }
}
