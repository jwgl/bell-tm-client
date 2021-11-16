import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { Room } from '../shared/form.model';
import './form-editor.model';
import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class PlaceFormEditorComponent {
    editMode: EditMode;
    form: Room;
    departments: any[];
    buildings: any[];
    placeTypes: any[];
    purposes: any[];
    seatTypes: any[];
    defualtBuilding: string;
    placeTypeLevel1: string;
    purposeSelected: any[];
    deleteAble: boolean;

    constructor(
        private service: RoomFormService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogs: CommonDialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        this.route.params.subscribe(params => {
            if (this.editMode === EditMode.Create) {
                this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
            } else if (this.editMode === EditMode.Edit) {
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
            }
        });
    }

    onLoadData(dto: any) {
        this.form = new Room(dto.form);
        this.departments = dto.departments;
        this.buildings = dto.buildings;
        this.placeTypes = dto.placeTypes;
        this.purposes = dto.purposes;
        this.seatTypes = dto.seatTypes;
        this.deleteAble = dto.deleteAble;
        if (this.editMode === EditMode.Create) {
            this.defualtBuilding = this.buildings[0].name;
            this.form.building = this.defualtBuilding;
        } else {
            this.defualtBuilding = this.form.building;
            this.placeTypeLevel1 = this.form.groups;
            this.purposeSelected = this.form.purpose ? this.form.purpose.split(';') : [];
        }
    }

    onObjectSelected(object: any) {
        this.form.building = object.name;
        this.defualtBuilding = object.name;
    }

    filterBySubject(name: string) {
        return (placeType: any) => placeType.level1 === name;
    }

    level1Change(level1: string) {
        const type = this.placeTypes.find((t: any) => t.level1 === level1);
        if (type) {
            this.form.placeTypeId = type.id;
        }
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validation: string[] = [];
        if (this.isEmpty(this.form.name)) {
            validation.push('房间号不能空');
        }
        if (this.isEmpty(this.form.building)) {
            validation.push('请输入教学楼');
        }
        if (this.isEmpty(this.form.departmentId)) {
            validation.push('请选择使用单位');
        }
        if (this.isEmpty(this.form.placeTypeId)) {
            validation.push('请指定场地具体类别');
        }
        if (this.isEmpty(this.form.status)) {
            validation.push('请选择场地状态');
        }
        return validation;
    }

    save() {
        const validation = this.validate();
        if (this.purposeSelected && this.purposeSelected.length > 0) {
            this.form.purpose = this.purposeSelected.map(item => item.name).join(';');
        } else {
            this.form.purpose = null;
        }
        if (validation.length) {
            this.dialogs.error(validation);
        } else if (this.editMode === EditMode.Create) {
            this.create();
        } else if (this.editMode === EditMode.Edit) {
            this.update();
        }
    }

    create() {
        this.service.create(this.form.toDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        });
    }

    update() {
        if (this.form.status === 'DELETED' && !this.deleteAble) {
            alert('该场地还有设备，请先将设备移除再取消！');
        } else {
            this.service.update(this.form.id, this.form.toDto()).subscribe(id => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
        }
    }
}
