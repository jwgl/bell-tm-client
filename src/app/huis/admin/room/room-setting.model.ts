export interface RoomReservation {
    id: number,
    lowerDate: string,
    upperDate: string,
    dateInterval: number,
    lowerTime: string,
    upperTime: string,
    note: string,
}

export interface Room {
    id: number,
    name: string,
    reservations: RoomReservation[],
}
