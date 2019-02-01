export class ExpertForm {
    id: number;
    teacherId: string;
    teacherName: string;
    email: string;
    departmentName: string;
    sex: string;
    phone: string;
    academicTitle: string;
    academicDegree: string;
    team: number;

    constructor(dto: any) {
        this.id = dto.id;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
        this.email = dto.email;
        this.departmentName = dto.departmentName;
        this.sex = dto.sex;
        this.phone = dto.phone;
        this.academicDegree = dto.academicDegree;
        this.academicTitle = dto.academicTitle;
        this.team = dto.team;
    }
}
