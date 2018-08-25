import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { weekRangeConflict } from 'core/utils';

import { NumberStringOption, OddEvenOptions } from 'core/options';
import { BookingForm, BookingSection } from '../../../shared/booking-form.model';
import { BookingFormService } from '../../booking-form.service';

interface BookingDayOption {
    week: number;
    dayOfWeek: number;
    date: moment.Moment;
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
        startDate: moment.Moment,
        swapToDates: moment.Moment[],
    };

    today: moment.Moment;

    vm: {
        simpleOption: boolean;
        startWeeks?: number[];
        endWeeks?: number[];
        oddEvens?: NumberStringOption[];
        dayOfWeeks?: NumberStringOption[];
        days?: BookingDayOption[];
    };

    queryOptions: QueryOptions;

    _bookingDay: BookingDayOption;

    places: any[] = [];
    finding = false;

    constructor(private service: BookingFormService) {
        super();
        moment.locale('zh-cn');
    }

    get bookingDay(): BookingDayOption {
        return this._bookingDay;
    }

    set bookingDay(value: BookingDayOption) {
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
            const day = moment(this.term.startDate)
                .add(week - this.term.startWeek, 'weeks')
                .add(this.queryOptions.dayOfWeek - 1, 'days');
            for (const date of this.term.swapToDates) {
                if (date.isSame(day)) {
                    return true;
                }
            }
        }
        return false;
    }

    get startDate(): string {
        const day = moment(this.term.startDate);
        day.add(this.queryOptions.startWeek - this.term.startWeek, 'weeks');
        day.add(this.queryOptions.dayOfWeek - 1, 'days');
        return day.format('YYYY-MM-DD');
    }

    protected onOpening(): Observable<any> {
        this.term = {
            startWeek: this.options.term.startWeek,
            maxWeek: this.options.term.maxWeek,
            currentWeek: this.options.term.currentWeek,
            startDate: moment(this.options.term.startDate),
            swapToDates: this.options.term.swapDates.map((it: { from: string, to: string }) => moment(it.to)),
        };

        this.today = moment(this.options.today);

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

            let day = moment(this.today);
            let today = moment(this.today);

            if (today.isBefore(this.term.startDate)) {
                day = moment(this.term.startDate);
                today = moment(this.term.startDate);
            } else {
                day.add(2, 'day');
            }

            if (day.isAfter(moment(this.term.startDate).add(this.term.maxWeek, 'weeks'))) {
                return;
            }

            for (let i = 0; i < this.options.bookingDays; i++) {
                let week = this.term.currentWeek + day.isoWeek() - today.isoWeek();
                if (week < this.term.currentWeek) { // cross year
                    week += today.isoWeeksInYear();
                }
                if (week > this.term.maxWeek) {
                    break;
                }

                this.vm.days.push({
                    week,
                    dayOfWeek: day.isoWeekday(),
                    date: moment(day),
                });

                day.add(1, 'day');
            }

            if (this.vm.days.length > 0) {
                this.bookingDay = this.vm.days[0];
            }
        } else {
            this.vm.startWeeks = [];
            this.vm.endWeeks = [];
            this.vm.oddEvens = OddEvenOptions;
            this.vm.dayOfWeeks = [];

            for (let i = this.term.currentWeek; i <= this.term.maxWeek; i++) {
                if (this.options.bookingDays === -1 || this.options.bookingDays === 0 && i <= this.term.currentWeek + 2) {
                    this.vm.startWeeks.push(i);
                }
                this.vm.endWeeks.push(i);
            }

            for (let i = 1; i <= 7; i++) {
                this.vm.dayOfWeeks.push({
                    value: i,
                    label: moment.weekdays(i),
                });
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
