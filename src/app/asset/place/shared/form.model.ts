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
    plans: any;
    labelStr: string;
    labelItems: any;
    planning: boolean;
    pictures: string[];

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
        if (this.plans) {
            this.plans = this.plans.map(plan =>
                ({dateCreated: plan.dateCreated, name: plan.name, status: plan.status, termId: plan.termId, action: plan.action,
                rooms: JSON.parse(plan.info)}));
        }
    }
}
