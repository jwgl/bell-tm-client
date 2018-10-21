import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'tm-multiple-line',
    template: '<p *ngFor="let line of lines">{{line}}</p>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleLineComponent {
    lines: string[];

    @Input()
    set text(value: string) {
        this.lines = value.split(/[\r\n]+/gm).map(line => line.trim())
    };
}
