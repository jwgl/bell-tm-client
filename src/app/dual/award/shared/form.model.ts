import * as dayjs from 'dayjs';

export class AwardForm {
    id: number;
    title: string;
    content: string;
    requestBegin: string;
    requestEnd: string;
    paperEnd: string;
    approvalEnd: string;
    departmentId: string;
    departmentName: string;
    toggleShow: boolean;
    applicationOn: boolean;
    paperOn: boolean;

    constructor(dto: any) {
        Object.assign(this, dto);
    }

    get isApplyDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.requestBegin)) || dayjs().isAfter(dayjs(this.requestEnd).add(1, 'day')));
    }

    get isCheckDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.requestBegin)) || dayjs().isAfter(dayjs(this.approvalEnd).add(1, 'day')));
    }

    get isPaperDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.requestBegin)) || dayjs().isAfter(dayjs(this.paperEnd).add(1, 'day')));
    }
}
