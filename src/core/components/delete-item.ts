import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
    selector: 'button[delete-item]',
    styleUrls: ['delete-item.scss'],
    templateUrl: 'delete-item.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteItemComponent {
    constructor(private elementRef: ElementRef) {}
    @Input('delete-item') restore = false;

    @HostBinding('class')
    get hostClass(): string[] {
        return this.restore ? ['close', 'text-success'] : ['close', 'text-danger'];
    }
    
    @HostBinding('type')
    get hostType(): string {
        return 'button';
    }

    @HostListener("click") 
    click() {
        this.elementRef.nativeElement.blur();
    }
}
