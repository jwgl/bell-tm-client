import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';

import { Room } from '../shared/form.model';
import { RoomFormService } from '../form.service';
import { PlaceUpdatetDialog } from './place-update.dialog';

@Component({
    templateUrl: 'item.component.html',
})
export class PlaceItemComponent {
    vm: Room;
    createAble: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RoomFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe((dto: any) => {
            this.vm = new Room(dto.form);
            this.createAble = dto.createAble;
        });
    }

    setting() {
        this.dialog.open(PlaceUpdatetDialog, {measure: this.vm.measure, seat: this.vm.seat}).then(result => {
            this.dialogs.confirm('确认', '确定修改吗？').then(() => {
                this.service.update(this.vm.id, result).subscribe(id => {
                    this.router.navigate(['../'], { relativeTo: this.route });
                });
            });
        });
    }
}
