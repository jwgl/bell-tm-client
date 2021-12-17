import { Room } from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface Room {
        action: string;
        labels: any;
        counts: number;
        relativePlaces: any;
        placeTypeLevel1: any;
        rooms: any;
        toServerDto(): any;
    }
}

Room.prototype.toServerDto = function(this: Room): any {
    return {
        id: this.id,
        name: this.name,
        action: this.action,
        // seat: this.seat ? this.seat : 0,
        labels: this.labels ? this.labels.map((label: any) => label.id) : null,
        // status: this.status,
        // departmentId: this.departmentId,
        // placeTypeId: this.placeTypeId,
        // measure: this.measure,
        // counts: this.counts,
        relativePlaces: this.relativePlaces,
        // note: this.note,
        rooms: this.rooms,
    };
};
