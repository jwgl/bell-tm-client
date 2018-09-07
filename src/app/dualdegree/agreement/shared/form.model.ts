export class AgreementForm {
    id: number;
    agreementName: string;
    memo: string;
    items: AgreementItem[];
    university: any;

    constructor(dto: any) {
        this.id = dto.id;
        this.agreementName = dto.agreementName;
        this.memo = dto.memo;
        this.items = dto.items.map((itemDto: any) => new AgreementItem(itemDto));
        this.university = dto.university;
    }
}

/* tslint:disable:max-classes-per-file */
export class AgreementItem {
    form: AgreementForm;
    id: number;
    startedGrade: number;
    endedGrade: number;
    subjectName: string;
    departmentId: string;
    departmentName: string;
    coMajors: any[];

    constructor(dto: any) {
        this.id = dto.id;
        this.startedGrade = dto.startedGrade;
        this.endedGrade = dto.endedGrade;
        this.subjectName = dto.subjectName;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
        this.coMajors = dto.coMajors;
    }

    equalsTo(other: AgreementItem): boolean {
        if (this.id && other.id && this.id === other.id) {
            return true;
        }
        return false;
    }
}
