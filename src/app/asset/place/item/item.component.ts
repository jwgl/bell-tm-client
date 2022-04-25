import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';

import { Room } from '../shared/form.model';
import { RoomFormService } from '../form.service';
import { PlaceUpdatetDialog } from './place-update.dialog';
import { LabelComponent } from './label.component';
import { LabellingComponent } from './labelling.component';

@Component({
    templateUrl: 'item.component.html',
})
export class PlaceItemComponent {
    vm: Room;
    createAble: boolean;
    labels: any;
    labelTypes: any;
    planAble: boolean;
    pictures: any;
    selectedPicture = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RoomFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = new Room(dto.form);
            this.createAble = dto.createAble;
            this.labels = dto.labels ? dto.labels : [];
            this.labelTypes = dto.labelTypes ? dto.labelTypes : [];
            this.planAble = dto.planAble;
            this.pictures = this.vm.pictures;
        });
    }

    setting() {
        this.dialog.open(PlaceUpdatetDialog, { measure: this.vm.measure, seat: this.vm.seat }).then(result => {
            this.dialogs.confirm('确认', '确定修改吗？').then(() => {
                this.service.update(this.vm.id, result).subscribe(id => {
                    this.router.navigate(['../'], { relativeTo: this.route });
                });
            });
        });
    }

    labelCreate() {
        this.dialog.open(LabelComponent, { labelTypes: this.labelTypes }).then(result => {
            this.service.createLabel(result).subscribe(() => this.loadData(this.vm.id)
                , error => alert(`错误：${error.error.message}`));
        });
    }

    labelling() {
        this.dialog.open(LabellingComponent, { labels: this.labels }).then(result => {
            this.service.createRoomLabel({
                labelId: result.id,
                roomId: this.vm.id,
                dateExpire: result.dateExpire ? result.dateExpire : '2099-12-30',
            }).subscribe(() => this.loadData(this.vm.id)
                , error => alert(`错误：${error.error.message}`));
        });
    }

    get userId(): string {
        return this.service.userId;
    }

    onCreatePicture() {
        this.pictures = [];
        this.selectedPicture = true;
        this.scrollToView();
    }

    onEditPicture(pics: any) {
        this.pictures = pics;
        this.selectedPicture = true;
        this.scrollToView();
    }

    onPictureCreated(pictures: any) {
        this.service.createPicture(this.vm.id, pictures).subscribe(result => {
            this.pictures.concat(result);
            this.selectedPicture = false;
        });
    }

    onPictureCanceled() {
        this.selectedPicture = false;
    }

    get pictureUrl(): string {
        return this.service.getPictureUrl();
    }

    private scrollToView(): void {
        setTimeout(() => {
            document.getElementById('picture-editor').scrollIntoView();
        }, 1);
    }
}
