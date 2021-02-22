import { WorkflowTask } from "core/workflow2/task-list.model";

export interface Department {
    id: string;
    name: string;
}

export interface StatementUser {
    id: string;
    name: string;
    phoneNumber: string;
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
    upperTIme: Date;
    isActual: boolean;
}


export interface BookingAuth{}

export class StatementForm {
    id: number;
    user: StatementUser;
    department: Department;
    total: number;
    description: string;
    dateCreated: string;
    dateUpdated: string;
    workflowState: string;
    workflowInstanceId: string;
    status: string;
    zoneOffset: string;
    items: StatementItem[] =[];
    removedItems: StatementItem[] = [];
    workflowTasks: WorkflowTask[];
    
    constructor(dto: any) {
        this.id = dto.id;
        this.user = {
            id: dto.userId,
            name: dto.userName,
            phoneNumber: dto.userPhoneNumber,
        };
        this.zoneOffset = dto.zoneOffset;
        this.department = dto.id ? {
            id: dto.departmentId,
            name: dto.departmentName,
        } : undefined;
        this.total = dto.total;
        this.description = dto.description;
        this.workflowState = dto.workflowState;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.status = dto.status;
        this.dateCreated = dto.dateCreated;
        this.dateUpdated = dto.dateUpdated;
        this.items = dto.items ? dto.items.map((item: any) => new StatementItem(this, item)) : [];
        this.removedItems = [];
        this.workflowTasks = dto.workflowTasks;
    }

    get title(): string {
        return this.id ? `会议室结算单#${this.id}` : '会议室结算单';
    }

    get workflowTitle(): string {
        return `会议室结算单#${this.id}`;
    }
}

export class StatementItem {
    form: StatementForm;
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
    statementFormId: number;
    bookingItem: StatementBookingItem;

    constructor(form: StatementForm, dto: any) {
        this.form = form;
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
        this.statementFormId = dto.statementFormId;
        this.bookingItem = new StatementBookingItem(this, dto.item);
    }
}

export class StatementBookingItem {
    statementItem: StatementItem;
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
    dateConfirm: Date;
    workflowState: string;
    workflowInstanceId: string;
    status: string;
    operatorId: string;
    operatorName: string;
    operatorNote: string;
    note: string;
    
    bookingForm: StatementBookingForm;

    constructor(statementItem: StatementItem, dto: any) {
        this.statementItem = statementItem;
        this.id = dto.id;
        this.room = {
            id: dto.roomId,
            name: dto.roomName,
        }
        this.bookingLowerTime = new Date(dto.bookingLowerTime.replace('Z', statementItem.form.zoneOffset));
        this.bookingUpperTime = new Date(dto.bookingUpperTime.replace('Z', statementItem.form.zoneOffset));
        this.actualLowerTime = new Date(dto.actualLowerTime.replace('Z', statementItem.form.zoneOffset));
        this.actualUpperTime = new Date(dto.actualUpperTime.replace('Z', statementItem.form.zoneOffset));
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
        this.bookingForm = new StatementBookingForm(this, dto.form)
    }
}

export class StatementBookingForm {
    id: number;
    userName: string;
    departmentName: string;
    bookingTypeName: string;
    isInternal: boolean;
    subject: string;
    description: string;
    attendance: number;
    contact: string;
    contactNumber: string;
    workflowState: string;
    workflowInstanceId: string;
    status: string;
    bookingItem: StatementBookingItem;

    constructor(bookingItem: StatementBookingItem, dto: any) {
        this.bookingItem = bookingItem;
        this.id = dto.id;
        this.userName = dto.userName
        this.departmentName = dto.departmentName;
        this.bookingTypeName = dto.bookingTypeName;
        this.isInternal = dto.isInternal;
        this.subject = dto.subject;
        this.description = dto.description;
        this.attendance = dto.attendance;
        this.workflowState = dto.workflowState;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.status = dto.status;
    }
}
