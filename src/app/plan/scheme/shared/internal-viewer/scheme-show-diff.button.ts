import { Directive, ElementRef, EventEmitter, Input, HostListener, HostBinding, AfterViewInit, Output } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'button[scheme-show-diff]',
    exportAs: 'showDiff',
})
// tslint:disable-next-line:directive-class-suffix
export class SchemeShowDiffButton implements AfterViewInit {
    private _showDiff: boolean;
    private button: HTMLButtonElement;

    @Input('scheme-show-diff')
    previousId: number;

    @HostBinding('class')
    hostClass = 'btn btn-secondary';

    @HostBinding('style.display')
    get hostHidden(): string {
        return this.previousId ? 'initial' : 'none';
    }

    get showDiff(): boolean {
        return this._showDiff;
    }

    @Input()
    set showDiff(value: boolean) {
        this._showDiff = value;
        this._updateView();
    }

    @Output()
    showDiffChange = new EventEmitter<boolean>();

    constructor(private elementRef: ElementRef) {
        this.button = this.elementRef.nativeElement as HTMLButtonElement;
    }

    ngAfterViewInit() {
        this._updateView();
        if (!this.previousId) {
            this.button.parentElement.classList.remove('ml-2');
        }
    }

    @HostListener('click')
    click() {
        this.showDiff = !this.showDiff;
        this.showDiffChange.emit(this._showDiff);
    }

    private _updateView(): void {
        this.button.innerText = this._showDiff ? '隐藏变更' : '显示变更';
    }
}
