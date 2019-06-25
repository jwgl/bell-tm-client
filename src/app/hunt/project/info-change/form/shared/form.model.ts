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
    reason: string;
    title: string;
    degree: string;
    email: string;
    office: string;
    phone: string;
    fileType: any;

    constructor(dto: any) {
        Object.assign(this, dto);
        this.memberList = [];
        for (let i = 0; i < 6; i++) {
            this.memberList.push({ value: '' });
        }
        if (this.members) {
            const memberArray = this.members.split(';');
            memberArray.forEach((item, index) => this.memberList[index].value = item);
        }
    }

    tranFile(fileType: any) {
        this.fileType = fileType;
        this.fileType.names = this.mainInfoForm ? [this.mainInfoForm] : [];
    }
}


