import { WorkflowTask } from 'core/workflow2/task-list.model';

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

export interface BookingRoomView {
    id: number;
    name: string;
    seat: number;
    unitPrice: number;
    timeUnit: number;
    isInternalFree: boolean;
    departmentId: string;
    departmentName: string;
    furniture: String;
    maxSeat: number;
    isPublic: boolean;

    facilities: RoomFacilityView[];
    bookedTimes: BookingTimeView[];
}

export interface RoomFacilityView {
    id: number;
    name: string;
    unitPrice: number;
    unitName: string;
    timeUnit: number;
    quantity: number;
    isBasic: boolean;
    selected?: boolean;
    note?: string
}

export interface BookingTimeView {
    id: number;
    lowerTime: Date;
    upperTime: Date;
    isActual: boolean;
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
    zoneOffset: string;
    items: BookingItem[] =[];
    removedItems: BookingItem[] = [];
    workflowTasks: WorkflowTask[];
    
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
            departmentId: dto.userDepartmentId,
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
        this.contact = dto.contact;
        this.contactNumber = dto.contactNumber;
        this.workflowState = dto.workflowState;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.status = dto.status;
        this.zoneOffset = dto.zoneOffset;
        this.items = dto.items? dto.items.map((item: any) => new BookingItem(this, item)):[];
        this.removedItems = [];
        this.workflowTasks = dto.workflowTasks;
    }

    get title(): string {
        return this.id ? `会议室借用单#${this.id}` : '会议室借用单';
    }

    get workflowTitle(): string {
        return `会议室借用单#${this.id}`;
    }

    get occupied(): boolean {
        return !!this.items.find(it => it.occupied);
    }
}

/* tslint:disable:max-classes-per-file */
export class BookingItem {
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
    isConflict: boolean;
    occupied: boolean;
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
    
    constructor(form: BookingForm, dto: any) {
        this.form = form;
        this.id = dto.id;
        this.room = {
            id: dto.roomId,
            name: dto.roomName,
        }
        this.bookingLowerTime = new Date(dto.bookingLowerTime.replace('Z', form.zoneOffset));
        this.bookingUpperTime = new Date(dto.bookingUpperTime.replace('Z', form.zoneOffset));
        this.actualLowerTime = dto.actualLowerTime ? new Date(dto.actualLowerTime.replace('Z', form.zoneOffset)) : undefined;
        this.actualUpperTime = dto.actualLowerTime ? new Date(dto.actualUpperTime.replace('Z', form.zoneOffset)) : undefined;
        this.timeUnit = dto.timeUnit;
        this.occupied = dto.occupied;
        this.timeUnit = dto.timeUnit;
        this.timeUnitQuantity = dto.timeUnitQuantity;
        this.overTimeQuantity = dto.overTimeQuantity;
        this.isConflict = dto.isConflict;
        this.dateConfirm = dto.dateConfirm;
        this.workflowState = dto.workflowState;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.status= dto.status;
        this.operatorId = dto.operatorId;
        this.operatorName = dto.operatorName;
        this.operatorNote = dto.operatorNote;
        this.note = dto.note;
        this.facilities = dto.facilities.map((item: any) => new BookingFacility(this, item));
    }

    get subtotal(): number {
        return this.facilities.filter(it => it.operative).reduce((acc, bf) => acc + bf.subtotal, 0);
    }
}

export class BookingFacility {
    item: BookingItem;    
    id: number;
    facility: {
        id: number,
        name: string,
    }
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

    constructor(item: BookingItem, dto: any) {
        this.item = item;
        this.id = dto.id;
        this.facility = {
            id: dto.facilityId,
            name: dto.facilityName,
        };
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
        return !this.status || ['ACTIVE', 'INACTIVE'].includes(this.status);
    }
}
