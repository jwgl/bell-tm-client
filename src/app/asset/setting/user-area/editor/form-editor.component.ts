import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { UserAreaService } from '../user-area.service';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class UserAreaEditorComponent {
    editMode: EditMode;
    form: any;
    rooms: any;
    teacher: any;
    saving = false;

    constructor(
        private service: UserAreaService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        if (this.editMode === EditMode.Create) {
            this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
        }
    }

    onLoadData(dto: any) {
        this.form = dto.form;
        this.rooms = dto.rooms;
    }

    onTeacherSelected(teacher: any) {
        if (teacher) {
            this.form.userId = teacher.id;
        }
    }

    onRowSelected(roomsSelected: any) {
        this.form.rooms =
            this.rooms.filter((room: any) => roomsSelected.some(item => room.id === item.id))
                .map(room => room.id);
    }

    save() {
        if (!this.form.userId) {
            alert('请选择一位老师！');
        } else if (this.editMode === EditMode.Create) {
            this.create();
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form).subscribe(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
        });
    }
}
