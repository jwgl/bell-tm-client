export class ServiceLogForm {
    id: number;
    roomId: number;
    termId: number;
    building: string;
    roomName: string;
    dateCreated: string;
    logDate: string;
    section: string;
    contact: string;
    department: string;
    departmentName: string;
    userName: string;
    type: string;
    item: string;
    status: string;
    dateFinished: string;
    note: string;

    constructor(dto: any) {
        Object.assign(this, dto);
    }

    toServerDto(): any {
        return {
            building: this.building,
            roomName: this.roomName,
            logDate: this.logDate,
            section: this.section,
            departmentId: this.department,
            contact: this.contact,
            type: this.type,
            item: this.item,
            dateFinished: this.dateFinished,
            note: this.note,
        };
    }
}

export const ServiceType = ['操作指导', '设备故障', '线路故障'];
export const ServiceItem = [
    '中控设备',
    '音响设备',
    '投影设备',
    '主机系统设备',
    '外接设备',
    '电源开关',
    '显示屏',
    '网络连接',
    '软件安装',
    '虚拟机问题',
    '课件处理',
    '录播设备',
    '直播设备',
    '其他',
];
export const Status = ['待完成', '完成'];
