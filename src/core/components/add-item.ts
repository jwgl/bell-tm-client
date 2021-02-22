import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
    selector: 'button[add-item]',
    styleUrls: ['add-item.scss'],
    templateUrl: 'add-item.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemComponent {
    constructor(private elementRef: ElementRef) {}
 
    @HostBinding('class')
    get hostClass(): string[] {
        return ['close', 'text-info'];
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
