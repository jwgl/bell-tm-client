import { Component } from '@angular/core';
import { CommonDialog } from 'core/common-dialogs';

import { AddReservationDialogService } from './add-reservation/add-reservation.service';
import { RoomSettingService } from './room-setting.service';
import { Room, RoomReservation } from './room-setting.model';
import * as dayjs from 'dayjs';

@Component({
    styleUrls: ['room-setting.component.scss'],
    templateUrl: 'room-setting.component.html',
})
export class RoomSettingComponent {
    rooms: Room[];
    selectedRoom: Room = null;
    schedules: any[];
    day: number;

    constructor(
        private service: RoomSettingService,
        private commonDialog: CommonDialog,
        private addReservationDialog: AddReservationDialogService,
    ) {
        this.service.loadList().subscribe((data: any[]) => {
            this.rooms = data;
        });
    }

    roomSelected(room: Room) {
        this.selectedRoom = room;
        this.schedules = undefined;
        this.getSchedules(7);
    }

    addReservation() {
        this.addReservationDialog.open({ room: this.selectedRoom.name }).then(result => {
            this.service.createReservation(this.selectedRoom.id, result).subscribe(id => {
                if (!this.selectedRoom.reservations) {
                    this.selectedRoom.reservations = [];
                }
                this.selectedRoom.reservations.push({ ...id, ...result });
            }, errorRsp => {
                alert(errorRsp.error.message);
            });
        });
    }

    deleteReservation(reservation: RoomReservation) {
        this.commonDialog.confirm('删除', '确定要删除预留时间吗？').then(() => {
            this.service.deleteReservation(this.selectedRoom.id, reservation.id).subscribe(() => {
                const index = this.selectedRoom.reservations.indexOf(reservation);
                this.selectedRoom.reservations.splice(index, 1);
            }, errorRsp => {
                alert(errorRsp.error.message);
            });
        });
    }

    getSchedules(day: number) {
        this.day = day;
        const start = day == 0 ? '2000-01-01' : (day > 0 ? dayjs() : dayjs().add(day, 'day')).format("YYYY-MM-DD");
        const end = day == 0? '9999-12-30': (day > 0 ? dayjs().add(day - 1, 'day') : dayjs().subtract(1, 'day')).format("YYYY-MM-DD");
        this.service.loadSchedules(this.selectedRoom.id, start, end).subscribe(result => {
            this.schedules = result;
        }, errorRsp => {
            alert(errorRsp.error.message);
        });
    }
}
