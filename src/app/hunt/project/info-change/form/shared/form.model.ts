export class ChangeForm {
    id: number;
    projectId: number;
    projectName: string;
    name: string;
    principalId: string;
    principalName: string;
    subtype: string;
    level: string;
    type: number[];
    members: string;
    status: string;
    content: string;
    achievements: string;
    mainInfoForm: string;
    code: string;
    dateSubmitted: string;
    middleYear: number;
    knotYear: number;
    memberList: any[];
    other: string;
    departmentName: string;
    reviewer: boolean;
    dateReviewed: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.projectId = dto.projectId;
        this.projectName = dto.projectName;
        this.name = dto.name;
        this.principalId = dto.principalId;
        this.principalName = dto.principalName;
        this.subtype = dto.subtype;
        this.level = dto.level;
        this.type = dto.type;
        this.members = dto.members;
        this.status = dto.status;
        this.content = dto.content;
        this.achievements = dto.achievements;
        this.mainInfoForm = dto.mainInfoForm;
        this.code = dto.code;
        this.departmentName = dto.departmentName;
        this.dateSubmitted = dto.dateSubmitted;
        this.middleYear = dto.middleYear;
        this.knotYear = dto.knotYear;
        this.other = dto.other;
        this.reviewer = dto.reviewer;
        this.dateReviewed = dto.dateReviewed;
        this.memberList = [];
        for (let i = 0; i < 6; i++) {
            this.memberList.push({ value: '' });
        }
        if (this.members) {
            const memberArray = this.members.split(';');
            memberArray.forEach((item, index) => this.memberList[index].value = item);
        }
    }
}


