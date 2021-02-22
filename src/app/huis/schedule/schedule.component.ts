import { Component } from '@angular/core';

import * as dayjs from 'dayjs';

import { RoomScheduleService } from './schedule.service';

@Component({
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html',
})
export class RoomScheduleComponent {
    selectedMonth: string;
    rows = new Int32Array([0, 1, 2, 3, 4, 5]);
    cols = new Int32Array([0, 1, 2, 3, 4, 5, 6]);
    firstDay: dayjs.Dayjs;
    today: dayjs.Dayjs;
    roomSchedules: any[];

    constructor(private service: RoomScheduleService) {
        const today = new Date();
        const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.today = dayjs(todayString);
        this.selectedMonth = this.today.format('YYYY-MM');
        this.loadData();
    }

    loadData() {
        const firstDayOfMonth = dayjs(`${this.selectedMonth}-01`);
        const dayOfWeek = firstDayOfMonth.day() ? firstDayOfMonth.day() - 1 : 6;
        this.firstDay = firstDayOfMonth.subtract(dayOfWeek, 'day');
        const lastDay = this.firstDay.add(this.rows.length * this.cols.length - 1, 'day');
        this.service.loadList({ 
            start: this.firstDay.format('YYYY-MM-DD'),
            end: lastDay.format('YYYY-MM-DD'),
         }).subscribe((data: any[]) => {
            this.roomSchedules = data;
        });
    }

    monthChanged() {
        this.loadData();
    }

    previousMonth() {
        this.selectedMonth = dayjs(this.selectedMonth, "YYYY-MM").subtract(1, 'month').format("YYYY-MM");
        this.loadData();
    }

    nextMonth() {
        this.selectedMonth = dayjs(this.selectedMonth, "YYYY-MM").add(1, 'month').format("YYYY-MM");
        this.loadData();
    }

    getDay(row: number, col: number) {
        return dayjs(this.firstDay).add(row * this.cols.length + col, 'day').date();
    }

    getDate(row: number, col: number): dayjs.Dayjs {
        return dayjs(this.firstDay).add(row * this.cols.length + col, 'day');
    }

    getSchedule(row: number, col: number): any[] {
        const date = this.getDate(row, col).format('YYYY-MM-DD');
        return this.roomSchedules.find(it => it.bookedDate == date)?.bookedTimes;
    }

    isThisMonth(row: number, col: number): boolean {
        return this.getDate(row, col).format('YYYY-MM') == this.selectedMonth;
    }

    isToday(row: number, col: number): boolean {
        return this.getDate(row, col).isSame(this.today);
    }

    getClipboardText(row: number, col: number): string {
        return this.getSchedule(row, col).map(it =>
            `${it.lowerTime}-${it.upperTime}\t${it.room}\t${it.subject}`
        ).join('\n');
    }
}
