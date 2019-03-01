import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { fromNowLabel, fromNowTitle } from 'core/utils/from-now';
@Component({
    selector: 'from-now',
    template: '{{date}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FromNowComponent {
    private _date: string;

    @Input() set date(value: string) {
        this._date = value;
    }

    get date(): string {
        console.log(fromNowLabel(this._date))
        return fromNowLabel(this._date);
    }

    @HostBinding('title')
    get title(): string {
        return fromNowTitle(this._date);
    }
}
