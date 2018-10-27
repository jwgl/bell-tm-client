import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'tm-multiple-line',
    template: `
        <p *ngFor="let line of lines">{{line}}</p>
        <ng-container *ngIf="empty && (!lines || !lines.length)">&lt;{{empty}}&gt;</ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleLineComponent {
    lines: string[];

    @Input()
    set text(value: string) {
        if (value) {
            this.lines = value.split(/[\r\n]+/gm).map(line => line.trim())
        }
    };

    @Input()
    empty: string;
}
