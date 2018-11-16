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

    constructor(dto: any) {
        this.id = dto.id;
        this.title = dto.title;
        this.content = dto.content;
        this.startDate = dto.startDate;
        this.endDate = dto.endDate;
        this.type = dto.type;
        this.remind = dto.remind;
        this.ban = dto.ban;
    }

    get isApplyDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.startDate)) || dayjs().isAfter(dayjs(this.endDate).add(1, 'day')));
    }
}
