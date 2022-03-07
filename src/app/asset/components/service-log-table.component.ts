import { Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BaseTable } from './baseTable';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-asset-service-log-table',
    styleUrls: ['filter-group.scss'],
    templateUrl: 'service-log-table.component.html',
})
export class ServiceLogTableComponent extends BaseTable implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    @ViewChild('hinder', { static: true }) hinder: ElementRef;
    @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
    @ViewChild('labelTmpl', { static: true }) labelTmpl: TemplateRef<any>;
    @Output() checkedList = new EventEmitter<any>();
    @Input() set hindFields(value: any) {
        this.hinds = value;
    }
    @Output() fieldsForSave = new EventEmitter<any>();

    @Input() set checkAble(value: boolean) {
        if (value) {
            this.columns = [{ draggable: false, sortable: false, headerCheckboxable: true, width: 30, checkboxable: true }]
                .concat(this.columns);
        }
    }

    constructor() {
        super();
        this.columns = [
            { draggable: false, name: 'ID', prop: 'id', cellTemplate: this.idTmpl, width: 80 },
            { prop: 'building', name: '教学楼', width: 90 },
            { prop: 'roomName', name: '房间号', width: 60 },
            { prop: 'logDate', name: '报修日期', width: 90 },
            { prop: 'section', name: '节次', width: 60 },
            { prop: 'department', name: '报修单位', comparator: this.localComparator, width: 90 },
            { prop: 'contact', name: '报修人', comparator: this.localComparator, width: 90 },
            { prop: 'userName', name: '值班人', comparator: this.localComparator, width: 90 },
            { prop: 'type', name: '服务保障类型', comparator: this.localComparator },
            { prop: 'item', name: '服务保障项目', comparator: this.localComparator },
            { prop: 'status', name: '状态', comparator: this.localComparator, width: 90 },
            { prop: 'dateFinished', name: '完成日期', width: 90 },
            { prop: 'note', name: '备注', width: 120 },
        ];
    }

    @Input() set detailShow(value: boolean) {
        if (value) {
            let prop = this.columns.find(th => th.prop === 'id');
            if (prop) {
                prop['cellTemplate'] = this.idTmpl;
            }
            prop = this.columns.find(th => th.prop === 'labels');
            if (prop) {
                prop['cellTemplate'] = this.labelTmpl;
            }
        }
    }

    @Input() set data(value: any[]) {
        if (value) {
            const filterColumns = [
                { name: 'building', label: '教学楼' },
                { name: 'roomName', label: '房间号' },
                { name: 'logDate', label: '报修日期' },
                { name: 'department', label: '报修单位' },
                { name: 'userName', label: '值班人' },
                { name: 'type', label: '服务保障类型' },
                { name: 'item', label: '服务保障项目' },
                { name: 'status', label: '状态' }
            ];
            this.setData(value, filterColumns);
        }
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

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        selected.forEach(t => t.checked = true);
        this.selected.push(...selected);
        this.checkedList.emit(this.selected);
    }

    saveHindField() {
        this.fieldsForSave.emit(this.hinds);
    }
}
