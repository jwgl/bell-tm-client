export class CheckerForm {
    id: number;
    teacherId: string;
    teacherName: string;
    departmentId: string;
    departmentName: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
    }
}
