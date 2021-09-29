import { WorkflowTask } from "core/workflow2/task-list.model";

export interface Department {
    id: string;
    name: string;
}

export interface BookingType {
    id: number;
    name: string;
    checker?: {
        id: string;
        name: string;
    }
}

export interface BookingUser {
    id: string;
    name: string;
    phoneNumber: string;
    departmentId: string;
}

export function formatTimeUnit(timeUnit: number): string {
    switch(timeUnit) {
        case 1: return '小时';
        case 4: return '单元';
        default: throw new Error(`Unsupported timeUnit: ${timeUnit}`);        
    }
}

export interface BookingAuth{}

export class BookingForm {
    id: number;
    user: BookingUser;
    department: Department;
    bookingType: BookingType;
    isInternal: boolean;
    subject: string;
    description: string;
    attendance: number;
    contact: string;
    contactNumber: string;
    workflowState: string;
    workflowInstanceId: string;
    status: string;
    constructor(dto: any) {
        if (!dto) {
            this.isInternal = false;
            return;
        }
        this.id = dto.id;
        this.user = {
            id: dto.userId,
            name: dto.userName,
            phoneNumber: dto.userPhoneNumber,
            departmentId: dto.userDepartmentId
        }
        this.department = {
            id: dto.departmentId,
            name: dto.departmentName,
        };
        this.bookingType = {
            id: dto.bookingTypeId,
            name: dto.bookingTypeName,
        };
        this.isInternal = dto.isInternal;
        this.subject = dto.subject;
        this.description = dto.description;
        this.attendance = dto.attendance;
        this.workflowState = dto.workflowState;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.status = dto.status;
    }
}

/* tslint:disable:max-classes-per-file */
export class OperationForm {
    form: BookingForm;
    id: number;
    room: {
        id: string;
        name: string;
    };
    bookingLowerTime: Date;
    bookingUpperTime: Date;
    actualLowerTime: Date;
    actualUpperTime: Date;
    timeUnit: number;
    timeUnitQuantity: number;
    overTimeQuantity: number;
    dateConfirm: Date;
    workflowState: string;
    workflowInstanceId: string;
    status: string;
    operatorId: string;
    operatorName: string;
    operatorNote: string;
    note: string;
    zoneOffset: string;
    facilities: BookingFacility[];
    workflowTasks: WorkflowTask[];
    
    constructor(dto: any) {

        this.id = dto.id;
        this.room = {
            id: dto.roomId,
            name: dto.roomName,
        }
        this.zoneOffset = dto.zoneOffset;
        this.bookingLowerTime = new Date(dto.bookingLowerTime.replace('Z', this.zoneOffset));
        this.bookingUpperTime = new Date(dto.bookingUpperTime.replace('Z', this.zoneOffset));
        this.actualLowerTime = dto.actualLowerTime ? new Date(dto.actualLowerTime.replace('Z', this.zoneOffset)) : undefined;
        this.actualUpperTime = dto.actualLowerTime ? new Date(dto.actualUpperTime.replace('Z', this.zoneOffset)) : undefined;
        this.timeUnit = dto.timeUnit;
        this.timeUnit = dto.timeUnit;
        this.timeUnitQuantity = dto.timeUnitQuantity;
        this.overTimeQuantity = dto.overTimeQuantity;
        this.dateConfirm = dto.dateConfirm;
        this.workflowState = dto.workflowState;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.status= dto.status;
        this.operatorId = dto.operatorId;
        this.operatorName = dto.operatorName;
        this.operatorNote = dto.operatorNote;
        this.note = dto.note;
        
        this.form = new BookingForm(dto.form);
        this.facilities = dto.facilities.map((item: any) => new BookingFacility(this, item));
        this.workflowTasks = dto.workflowTasks;
    }

    get title(): string {
        return `会议室确认单#${this.form.id}-${this.id}`;
    }

    get workflowTitle(): string {
        return `会议室确认单#${this.id}`;
    }

    get subtotal(): number {
        return this.facilities.reduce((acc, bf) => acc + (bf.subtotal ?? 0), 0);
    }

    get actualUsed(): boolean {
        return this.status == 'ACTIVE'
    }

    set actualUsed(value: boolean) {
        if (this.status == 'ACTIVE' && value == false) {
            this.status = 'UNUSED';
        } else if(this.status == 'UNUSED' && value == true) {
            this.status = 'ACTIVE'
        }
    }

    updateLowerTime(date: string, time: string) {
        this.actualLowerTime = new Date(`${date}T${time}${this.zoneOffset}`)
    }

    updateUpperTime(date: string, time: string) {
        this.actualUpperTime = new Date(`${date}T${time}${this.zoneOffset}`)
    }
}

export class BookingFacility {
    id: number;
    facility: {
        id: number,
        name: string,
    }
    basePrice: number;
    unitPrice: number;
    unitName: string;
    timeUnit: number;
    quantity: number;
    isAdditional: boolean;
    discount: number;
    subtotal: number;
    status: string;
    note: string;
    statementFormId: string;

    constructor(item: OperationForm, dto: any) {
        this.id = dto.id;
        this.facility = {
            id: dto.facilityId,
            name: dto.facilityName,
        };
        this.basePrice = dto.basePrice;
        this.unitPrice = dto.unitPrice;
        this.unitName = dto.unitName;
        this.timeUnit = dto.timeUnit;
        this.quantity = dto.quantity;
        this.isAdditional = dto.isAdditional;
        this.discount = dto.discount;
        this.subtotal = dto.subtotal;
        this.status = dto.status;
        this.note = dto.note;
        this.statementFormId = dto.statementFormId
    }

    get operative(): boolean {
        return ['ACTIVE', 'INACTIVE'].includes(this.status);
    }
}