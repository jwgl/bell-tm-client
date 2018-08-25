import * as _ from 'lodash';

import { Schedule, TimeslotItem } from 'core/components/schedule-timetable/schedule-timetable.model';
import { multipleWeekRangesText } from 'core/utils';

declare module 'core/components/schedule-timetable/schedule-timetable.model' {
    interface Schedule {
        root: Schedule;
        children: Schedule[];
    }

    interface TimeslotItem {
        highlight: boolean;
        getFreeListenSchedule(): Schedule;
        getFreeListenClass(form: FreeListenForm): string;
    }
}

TimeslotItem.prototype.getFreeListenSchedule = function (this: TimeslotItem): Schedule {
    const schedule = this.schedules[0];
    return schedule.root ? schedule.root : schedule;
};

TimeslotItem.prototype.getFreeListenClass = function (this: TimeslotItem, form: FreeListenForm): string {
    const schedule = this.getFreeListenSchedule();
    switch (schedule.owner) {
        case 'department':
            return 'slotitem-other';
        case 'self':
            return form.scheduleSelected(schedule)
                ? 'slotitem-current'
                : form.scheduleApproved(schedule)
                    ? 'slotitem-approved'
                    : form.scheduleExisted(schedule)
                        ? 'slotitem-exists'
                        : 'slotitem-normal';
    }
};

export class FreeListenForm {
    id: number;
    term: number;
    studentId: string;
    studentName: string;
    atSchool: boolean;
    subject: string;
    grade: number;
    adminClass: string;
    checkerId: string;
    checkerName: string;
    reason: string;
    status: string;
    workflowInstanceId: string;
    items = [] as FreeListenItem[];
    /**
     * 无效的免听项，免听申请成功后，由于调整班级，该安排已不属于当前学生
     */
    invalidItems = [] as Array<{ id: number, scheduleId: string }>;
    /**
     * 其它表单中免听项
     */
    existedItems: Array<{ taskScheduleId: string, status: string }>;

    scheduleMap: { [key: string]: Schedule } = {};

    constructor(dto: any, schedules: Schedule[]) {
        this.id = dto.id;
        this.term = dto.term;
        this.studentId = dto.studentId;
        this.studentName = dto.studentName;
        this.atSchool = dto.atSchool;
        this.subject = dto.subject;
        this.grade = dto.grade;
        this.adminClass = dto.adminClass;
        this.checkerId = dto.checkerId;
        this.checkerName = dto.checkerName;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;

        schedules.forEach(schedule => {
            this.scheduleMap[schedule.id] = schedule;
        });

        schedules.forEach(schedule => {
            if (schedule.rootId) {
                schedule.root = this.scheduleMap[schedule.rootId];
                if (!schedule.root.children) {
                    schedule.root.children = [];
                }
                schedule.root.children.push(schedule);
            }
        });

        schedules.forEach(schedule => {
            if (schedule.children) {
                schedule.children.sort((a, b) => a.compare(b));
            }
        });

        for (const item of dto.items as Array<{ id: number, scheduleId: string }>) {
            const schedule = this.scheduleMap[item.scheduleId];
            if (schedule) {
                this.items.push(new FreeListenItem(item, schedule));
            } else {
                this.invalidItems.push(item);
            }
        }

        this.existedItems = dto.existedItems;
    }

    get title(): string {
        return this.id ? `免听申请#${this.id}` : '免听申请';
    }

    get workflowTitle(): string {
        return `免听申请#${this.id}`;
    }

    contains(item: FreeListenItem) {
        return !!this.items.find(it => it.schedule.id === item.schedule.id);
    }

    scheduleSelected(schedule: Schedule): boolean {
        return !!this.items.find(i => i.schedule.id === schedule.id);
    }

    scheduleExisted(schedule: Schedule): boolean {
        return !!this.existedItems.find(it => it.taskScheduleId === schedule.id);
    }

    scheduleApproved(schedule: Schedule): boolean {
        const item = this.existedItems.find(it => it.taskScheduleId === schedule.id);
        return item && item.status === 'APPROVED';
    }
}

/* tslint:disable:max-classes-per-file */
export class FreeListenItem {
    id: number;
    schedule: Schedule;

    constructor(dto: any, schedule?: Schedule) {
        this.id = dto.id;
        this.schedule = schedule;
    }

    toString() {
        if (this.schedule.children) {
            const childrenInfo = _.chain(this.schedule.children).groupBy(it => {
                return it.dayOfWeek * 10000 + it.startSection * 100 + it.totalSection;
            }).map((schedules: Schedule[]) => {
                return `${multipleWeekRangesText(schedules)} ${schedules[0].dayOfWeekText} ${schedules[0].sectionsText} / `
                    + `${_.uniq(schedules.map(it => it.teacherName)).join(',')}`;
            }).value();
            if (childrenInfo.length === 1) {
                return `${this.schedule.courseText} / ${childrenInfo[0]}`;
            } else {
                return `${this.schedule.courseText} / [ ${childrenInfo.join(', ')} ]`;
            }
        } else {
            return `${this.schedule.courseText} / `
                + `${this.schedule.weeksText} ${this.schedule.dayOfWeekText} ${this.schedule.sectionsText} / `
                + `${this.schedule.teacherName}`;
        }
    }
}

export class FreeListenSettings {
    term: number;
    applyStartDate: Date;
    applyEndDate: Date;
    checkStartDate: Date;
    checkEndDate: Date;
    today: Date;

    constructor(dto: any) {
        this.term = dto.term;
        this.applyStartDate = new Date(dto.applyStartDate);
        this.applyEndDate = new Date(dto.applyEndDate);
        this.checkStartDate = new Date(dto.checkStartDate);
        this.checkEndDate = new Date(dto.checkEndDate);
        this.today = new Date(dto.today);
    }

    get isApplyDateValid(): boolean {
        return this.today >= this.applyStartDate && this.today <= this.applyEndDate;
    }

    get isCheckDateValid(): boolean {
        return this.today >= this.checkStartDate && this.today <= this.checkEndDate;
    }
}
