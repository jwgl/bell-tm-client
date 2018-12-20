export class Review {
    id: number;
    name: string;
    code: string;
    level: string;
    subtype: string;
    departmentName: string;
    principalName: string;
    status: string;
    countOk: number;
    countVeto: number;
    countWaiver: number;
    countNull: number;
    average: number;
    departmentOpinion: string;
    expertReview: any;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.code = dto.code;
        this.level = dto.level;
        this.subtype = dto.subtype;
        this.departmentName = dto.departmentName;
        this.departmentOpinion = dto.departmentOpinion;
        this.principalName = dto.principalName;
        this.status = dto.status;
        this.countOk = dto.countOk;
        this.countVeto = dto.countVeto;
        this.countWaiver = dto.countWaiver;
        this.countNull = dto.countNull;
        this.average = dto.average ? dto.average : 0;
    }
}
