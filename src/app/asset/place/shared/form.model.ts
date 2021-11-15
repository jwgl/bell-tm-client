export class Room {
    id: number;
    name: string;
    building: string;
    groups: string;
    roomType: string;
    status: string;
    statusLabel: string;
    measure: number;
    seat: number;
    seatType: string;
    purpose: string;
    department: string;
    note: string;
    departmentId: string;
    placeTypeId: number;
    logs: any;
    labels: any;
    labelStr: string;

    constructor(dto: any) {
        Object.assign(this, dto);
        if (this.status) {
            this.statusLabel = { ON: '在用', BACKUP: '储备', DELETED: '取消', RAW: '未创建' }[this.status];
        }
        if (this.logs) {
            this.logs = this.logs.map(log =>
                ({dateCreated: log.dateCreated, from: JSON.parse(log.fromValue), to: JSON.parse(log.toValue)}));
        }
        if (this.labels) {
            this.labelStr = this.labels.map((label: any) => `${label.business}-${label.typeName}-${label.labelName}`).join('；');
        }
    }
}
