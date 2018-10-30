import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'tm-multiple-line',
    styleUrls: ['multiple-line.component.scss'],
    templateUrl: 'multiple-line.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleLineComponent {
    lines: string[];

    @Input()
    set text(value: string) {
        if (value) {
            this.lines = value.split(/[\r\n]+/gm).map(line => line.trim()).filter(line => !!line);
        }
    };

    @Input()
    empty: string;
}
