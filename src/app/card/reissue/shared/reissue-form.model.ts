export interface ReissueStudent {
    id: string;
    name: string;
    birthday: string;
    province: string;
    department: string;
    subject: string;
    educationLevel: string;
}

export class ReissueForm {
    id: number;
    reason: string;
    status: string;
    student: ReissueStudent;
    workflowInstanceId: string;

    constructor(dto: any, student: ReissueStudent) {
        this.id = dto.id;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.student = student;
    }

    get workflowTitle(): string {
        return `补办学生证申请-${this.student.id} ${this.student.name}`;
    }
}
