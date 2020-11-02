import { Room } from '../shared/form.model';

declare module '../shared/form.model' {
    interface Room {
        toServerDto(): any;
    }
}

Room.prototype.toServerDto = function(this: Room): any {
    return {
        name:　this.name,
        building: this.building,
        seat: this.seat,
        seatType: this.seatType,
        status: this.status,
        measure: this.measure,
        purpose: this.purpose,
        departmentId: this.departmentId,
        placeTypeId: this.placeTypeId,
        note: this.note,
    };
};
