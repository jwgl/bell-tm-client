import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { typeahead } from 'core/utils/typeahead';
import { Room } from '../shared/form.model';
import './plan-editor.model';
import { PlanService } from '../plan.service';

@Component({
    styleUrls: ['plan-editor.component.scss'],
    templateUrl: 'plan-editor.component.html',
})
export class PlanEditorComponent implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    editMode: EditMode;
    form: Room;
    departments: any[];
    placeTypes: any[];
    places: any[];
    placeTypeLevel1: string;
    actions = [{ name: 'SEPARATE', label: '分拆' }, { name: 'MERGE', label: '合并' }, { name: 'OTHER', label: '其他' }];
    termName: string;
    labels: any;
    saving = false;
    measureLabel = '面积';
    statusLabel = '场地状态';
    measure: number;
    selected = [];
    searchStr: string;

    constructor(
        private service: PlanService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogs: CommonDialog,
    ) {
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
        this.measure = this.form.measure;
        this.departments = dto.departments;
        this.placeTypes = dto.placeTypes;
        this.places = dto.places;
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

    actionChange(action: string) {
        if (action !== 'OTHER') {
            this.statusLabel = '新场地状态';
            this.measureLabel = action === 'SEPARATE' ? '拆后均面积' : '合并后面积';
        } else {
            this.statusLabel = '场地状态';
        }
    }

    countsChange(counts: number) {
        if (counts > 1) {
            this.measure = this.form.measure / counts;
        } else {
            alert('分拆房间数必须大于1');
        }
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validation: string[] = [];
        if (this.isEmpty(this.form.action)) {
            validation.push('请选择场地变动方式');
        }
        if (this.isEmpty(this.form.name)) {
            validation.push('房间号不能空');
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
        if (validation.length) {
            this.dialogs.error(validation);
        } else if (this.editMode === EditMode.Edit) {
            this.update();
        }
    }

    update() {
        this.saving = true;
        this.form.measure = this.measure;
        this.form.otherPlaces = this.selected;
        // console.log(this.form.toServerDto());
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        });
    }

    select(item: any) {
        if (this.selected.some(it => item === it)) {
            this.measure = this.measure - item.measure;
            this.selected.splice(this.selected.indexOf(item), 1);
        } else {
            this.selected.push(item);
            this.measure = this.measure + item.measure;
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
