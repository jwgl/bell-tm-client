import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

declare module 'dayjs' {
    interface Dayjs {
        fromNow();
    }
}
@Component({
    selector: 'from-now',
    template: '{{date}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FromNowComponent {
    private _date: dayjs.Dayjs;

    @Input() set date(value: string) {
        this._date = dayjs(value);
    }

    get date(): string {
        if (dayjs().diff(this._date, 'day') > 25) {
            return this._date.format('YYYY-MM-DD HH:mm');
        } else {
            return this._date.fromNow();
        }
    }

    @HostBinding('title')
    get title(): string {
        if (dayjs().diff(this._date, 'day') > 25) {
            return '';
        } else {
            return this._date.format('YYYY-MM-DD HH:mm');
        }
    }
}
