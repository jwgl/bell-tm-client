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
        labels: this.labels ? this.labels.map((label: any) => label.id) : null,
        relativePlaces: this.relativePlaces,
        rooms: this.rooms,
    };
};
