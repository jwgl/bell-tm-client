export class MentorForm {
    id: number;
    teacherId: string;
    teacherName: string;
    email: string;
    departmentName: string;
    sex: string;
    academicTitle: string;
    vChatId: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
        this.email = dto.email;
        this.departmentName = dto.departmentName;
        this.sex = dto.sex;
        this.vChatId = dto.vChatId;
        this.academicTitle = dto.academicTitle;
    }
}
