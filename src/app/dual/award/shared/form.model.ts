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

    constructor(dto: any) {
        this.id = dto.id;
        this.title = dto.title;
        this.content = dto.content;
        this.requestBegin = dto.requestBegin;
        this.requestEnd = dto.requestEnd;
        this.paperEnd = dto.paperEnd;
        this.approvalEnd = dto.approvalEnd;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
    }

    get isApplyDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.requestBegin)) || dayjs().isAfter(dayjs(this.requestEnd)));
    }

    get isCheckDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.requestBegin)) || dayjs().isAfter(dayjs(this.approvalEnd)));
    }

    get isPaperDateValid(): boolean {
        return !(dayjs().isBefore(dayjs(this.requestBegin)) || dayjs().isAfter(dayjs(this.paperEnd)));
    }
}
