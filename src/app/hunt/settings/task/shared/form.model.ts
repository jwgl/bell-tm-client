import * as dayjs from 'dayjs';

export class TaskForm {
    id: number;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    type: string;
    remind: string;
    ban: string;
    banMe: number;
    attach: string;

    constructor(dto: any) {
        Object.assign(this, dto);
    }

    get isApplyDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.startDate)) || dayjs().isAfter(dayjs(this.endDate).add(1, 'day')));
    }
}
