import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';

import { BaseDialog } from 'core/dialogs';
import { weekRangeConflict } from 'core/utils';

import { NumberStringOption, OddEvenOptions, DayOfWeekOptions } from 'core/options';
import { BookingForm, BookingSection } from '../../../shared/booking-form.model';
import { BookingFormService } from '../../booking-form.service';

interface BookingDay {
    week: number;
    dayOfWeek: number;
    date: Dayjs;
}

interface QueryOptions {
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    section: BookingSection;
    placeType: string;
}

@Component({
    styleUrls: ['find-place.dialog.scss'],
    templateUrl: 'find-place.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class FindPlaceDialog extends BaseDialog {
    term: {
        startWeek: number,
        maxWeek: number,
        currentWeek: number,
        startDate: Dayjs,
        swapToDates: Dayjs[],
    };

    today: Dayjs;

    vm: {
        simpleOption: boolean;
        startWeeks?: number[];
        endWeeks?: number[];
        oddEvens?: NumberStringOption[];
        dayOfWeeks?: NumberStringOption[];
        days?: BookingDay[];
    };

    queryOptions: QueryOptions;

    _bookingDay: BookingDay;

    places: any[] = [];
    finding = false;

    constructor(private service: BookingFormService) {
        super();
        dayjs.locale('zh-cn');
    }

    get bookingDay(): BookingDay {
        return this._bookingDay;
    }

    set bookingDay(value: BookingDay) {
        this._bookingDay = value;
        this.queryOptions.startWeek = value.week;
        this.queryOptions.endWeek = value.week;
        this.queryOptions.oddEven = 0;
        this.queryOptions.dayOfWeek = value.dayOfWeek;
    }

    startWeekChanged(newValue: number) {
        if (newValue > this.queryOptions.endWeek) {
            this.queryOptions.endWeek = newValue;
        }
        this.queryOptions.startWeek = newValue;
        this.places = [];
    }

    endWeekChanged(newValue: number) {
        if (newValue < this.queryOptions.startWeek) {
            this.queryOptions.startWeek = newValue;
        }
        this.queryOptions.endWeek = newValue;
        this.places = [];
    }

    findPlace() {
        this.finding = true;
        this.service.findPlace({
            startWeek: this.queryOptions.startWeek,
            endWeek: this.queryOptions.endWeek,
            oddEven: this.queryOptions.oddEven,
            dayOfWeek: this.queryOptions.dayOfWeek,
            sectionId: this.queryOptions.section.id,
            placeType: this.queryOptions.placeType,
        }).subscribe((data: any[]) => {
            this.places = data.filter(it => !(this.options.form as BookingForm).items.some(item => {
                return item.place.id === it.id
                    && item.dayOfWeek === this.queryOptions.dayOfWeek
                    && weekRangeConflict({
                        startWeek: this.queryOptions.startWeek,
                        endWeek: this.queryOptions.endWeek,
                        oddEven: this.queryOptions.oddEven,
                    }, item)
                    && _.intersection(item.section.includes, this.queryOptions.section.includes).length > 0;
            }));
            this.finding = false;
        });
    }

    get selectedCount() {
        return this.places.filter(it => it.selected).length;
    }

    placeRowClicked(event: Event, place: any) {
        if (!(event.target instanceof HTMLInputElement)) {
            place.selected = !place.selected;
        }
    }

    clearData() {
        this.places = [];
    }

    get containsSwapToDate(): boolean {
        for (let week = this.queryOptions.startWeek; week <= this.queryOptions.endWeek; week++) {
            const bookingDay = this.term.startDate
                .add(week - this.term.startWeek, 'week')
                .add(this.queryOptions.dayOfWeek - 1, 'day');
            for (const date of this.term.swapToDates) {
                if (date.isSame(bookingDay)) {
                    return true;
                }
            }
        }
        return false;
    }

    get startDate(): string {
        return this.term.startDate
            .add(this.queryOptions.startWeek - this.term.startWeek, 'week')
            .add(this.queryOptions.dayOfWeek - 1, 'day')
            .format('YYYY-MM-DD');
    }

    protected onOpening(): Observable<any> {
        this.term = {
            startWeek: this.options.term.startWeek,
            maxWeek: this.options.term.maxWeek,
            currentWeek: this.options.term.currentWeek,
            startDate: dayjs(this.options.term.startDate),
            swapToDates: this.options.term.swapDates.map((it: { from: string, to: string }) => dayjs(it.to)),
        };

        this.today = dayjs(this.options.today);

        this.queryOptions = {
            section: this.options.sections[0],
            placeType: '多媒体教室',
            startWeek: this.term.currentWeek,
            endWeek: this.term.currentWeek,
            oddEven: 0,
            dayOfWeek: 1,
        };

        this.vm = {
            simpleOption: this.options.bookingDays !== 0 && this.options.bookingDays !== -1,
        };

        if (this.vm.simpleOption) {
            this.vm.days = [];

            const startDay = this.today.isBefore(this.term.startDate)
                ? this.term.startDate
                : this.today.add(2, 'day');
            const lastDay = this.term.startDate.add(this.term.maxWeek, 'week');

            for (let i = 0; i < this.options.bookingDays; i++) {
                const bookingDay = startDay.add(i, 'day');

                if (!bookingDay.isBefore(lastDay)) {
                    return;
                }

                // sun:0;...;sat:6 -> mon-0;....;sun:6
                const dayOfWeek = this.today.isBefore(this.term.startDate)
                    ? (this.term.startDate.day() + 6) % 7 + bookingDay.diff(this.term.startDate, 'day')
                    : (this.today.day() + 6) % 7 + bookingDay.diff(this.today, 'day');
                this.vm.days.push({
                    week: this.term.currentWeek + Math.floor(dayOfWeek / 7),
                    dayOfWeek: dayOfWeek % 7 + 1,
                    date: bookingDay,
                });
            }

            if (this.vm.days.length > 0) {
                this.bookingDay = this.vm.days[0];
            }
        } else {
            this.vm.startWeeks = [];
            this.vm.endWeeks = [];
            this.vm.oddEvens = OddEvenOptions;
            this.vm.dayOfWeeks = [];
            this.vm.dayOfWeeks = DayOfWeekOptions;

            for (let i = this.term.currentWeek; i <= this.term.maxWeek; i++) {
                if (this.options.bookingDays === -1 || this.options.bookingDays === 0 && i <= this.term.currentWeek + 2) {
                    this.vm.startWeeks.push(i);
                }
                this.vm.endWeeks.push(i);
            }

            this.queryOptions.startWeek = this.vm.startWeeks[0];
            this.queryOptions.endWeek = this.vm.endWeeks[0];
            this.queryOptions.oddEven = this.vm.oddEvens[0].value;
            this.queryOptions.dayOfWeek = this.vm.dayOfWeeks[0].value;
        }
        return null;
    }

    protected onConfirmed(): any {
        return this.places
            .filter(it => it.selected)
            .map(it => ({
                startWeek: this.queryOptions.startWeek,
                endWeek: this.queryOptions.endWeek,
                oddEven: this.queryOptions.oddEven,
                dayOfWeek: this.queryOptions.dayOfWeek,
                section: this.queryOptions.section,
                place: {
                    id: it.id,
                    name: it.name,
                    seat: it.seat,
                    type: this.queryOptions.placeType,
                },
            }));
    }
}
