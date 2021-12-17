import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { typeahead } from 'core/utils/typeahead';
import { Room } from '../../shared/form.model';
import './plan-editor.model';
import { PlanService } from '../../plan.service';

@Component({
    styleUrls: ['plan-editor.component.scss'],
    templateUrl: 'plan-editor.component.html',
})
export class PlanEditorComponent implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    editMode: EditMode;
    form: Room;
    rooms: Room[] = [];
    departments: any[];
    placeTypes: any[];
    places: any[];
    buildings: any[];
    placeTypeLevel1: string;
    actions = [
        { name: 'CREATE', label: '新增' },
        { name: 'REMOVE', label: '取消' },
        { name: 'SEPARATE', label: '分拆' },
        { name: 'MERGE', label: '合并' },
        { name: 'OTHER', label: '其他' }];
    termName: string;
    labels: any;
    saving = false;
    measure: number;
    selected = [];
    searchStr: string;

    constructor(
        private service: PlanService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogs: CommonDialog,
    ) {
        this.rooms.push(new Room({}));
        this.editMode = this.route.snapshot.data['mode'];
        this.route.params.subscribe(params => {
            if (this.editMode === EditMode.Edit) {
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
            }
        });
    }

    ngAfterViewInit() {
        if (this.dropdown) {
            $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
                this.input.nativeElement.focus();
            });
        }
        if (this.input) {
            typeahead(this.input).pipe(
                switchMap(value => this.searchStr = value)
            ).subscribe(value => value);
        }
    }

    onLoadData(dto: any) {
        this.form = new Room(dto.form);
        this.form.name = null;
        this.measure = this.form.measure;
        this.departments = dto.departments;
        this.placeTypes = dto.placeTypes;
        this.places = dto.places;
        this.buildings = dto.buildings;
        this.termName = dto.termId ? `${Math.round(dto.termId / 10)}-${Math.round(dto.termId / 10) + 1}-${dto.termId % 10}学期` : null;
        this.placeTypeLevel1 = this.form.groups;
        this.labels = dto.labels.map((label: any) => ({ id: label.id, name: `${label.business}：${label.type}：${label.labelName}` }));
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

    countsChange(counts: number) {
        if (counts > 1) {
            this.rooms = [];
            for (let i = 0; i < counts; i++) {
                const room = new Room({});
                this.rooms.push(room);
            }
        } else {
            alert('分拆房间数必须大于1');
        }
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(form: any, index: number): string[] {
        const validation: string[] = [];
        let label = '';
        if (this.form.action === 'SEPARATE') {
            label = `场地${index}：`;
        }
        if (this.isEmpty(form.name)) {
            validation.push(`${label}房间号不能空`);
        }
        if (this.isEmpty(form.departmentId)) {
            validation.push(`${label}请选择使用单位`);
        }
        if (this.isEmpty(form.placeTypeId)) {
            validation.push(`${label}请指定场地具体类别`);
        }
        if (this.isEmpty(form.status)) {
            validation.push(`${label}请选择场地状态`);
        }
        return validation;
    }

    save() {
        if (this.isEmpty(this.form.action)) {
            this.dialogs.error(['请选择场地变动方式']);
        } else if (this.isEmpty(this.form.name)) {
            this.dialogs.error(['请输入计划名称']);
        }else {
            this.rooms.forEach((item: any, index: number) => {
                const validation = this.validate(item, index);
                if (validation.length) {
                    this.dialogs.error(validation);
                    return;
                }
            });
        }
        if (this.editMode === EditMode.Edit) {
            this.update();
        }
    }

    update() {
        this.saving = true;
        this.rooms.forEach((item: any) => {
            item.building = this.form.building;
            item.labels = item.labelItems ? item.labelItems.map((label: any) => label.id) : null;
            item.department = this.departments.find(d => d.id === item.departmentId).name;
            item.placeType = this.placeTypes.find(t => t.id === item.placeTypeId).level2;
        });
        this.form.rooms = this.rooms;
        this.form.relativePlaces = this.selected ? this.selected.map((place: any) => place.id) : [];
        if (this.form.action !== 'CREATE') {
            this.form.relativePlaces.push(this.form.id);
        }
        // console.log(this.form.toServerDto());
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        });
    }

    select(item: any) {
        if (this.selected.some(it => item === it)) {
            // this.measure = this.measure - item.measure;
            this.selected.splice(this.selected.indexOf(item), 1);
        } else {
            this.selected.push(item);
            // this.measure = this.measure + item.measure;
        }
        this.searchStr = null;
    }

    isSelected(item: any): boolean {
        return this.selected.some(it => item === it);
    }

    filterBySelected(i: boolean) {
        return (item: any) => {
            if (i) {
                return this.selected.some(it => item === it);
            } else {
                return !(this.selected.some(it => item === it)) &&
                    (!this.searchStr || item.name.indexOf(this.searchStr) >= 0);
            }
        };
    }

    get placeNames(): string {
        return this.selected.length > 0 ? this.selected.map(it => it.name).join('/') : '房间号';
    }
}
