export class Room {
    id: number;
    name: string;
    building: string;
    groups: string;
    roomType: string;
    status: string;
    measure: number;
    seat: number;
    seatType: string;
    purpose: string;
    department: string;
    note: string;
    departmentId: string;
    placeTypeId: number;

    constructor(dto: any) {
        Object.assign(this, dto);
    }
}
