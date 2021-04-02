import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { BaseTable } from './baseTable';

@Component({
    selector: 'tm-asset-place-table',
    styleUrls: ['filter-group.scss'],
    templateUrl: 'place-table.component.html',
})
export class PlaceTableComponent extends BaseTable {
    @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
    @Output() checkedList = new EventEmitter<any>();

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
            { prop: 'groups', name: '一级分类', comparator: this.localComparator, width: 90 },
            { prop: 'roomType', name: '二级分类', comparator: this.localComparator, width: 90 },
            { prop: 'name', name: '房间号', width: 60 },
            { prop: 'purpose', name: '功能', width: 90 },
            { prop: 'measure', name: '面积', width: 60 },
            { prop: 'seat', name: '座位数', width: 60 },
            { prop: 'seatType', name: '桌椅类型', comparator: this.localComparator },
            { prop: 'department', name: '使用单位', comparator: this.localComparator, width: 90 },
            { prop: 'statusLabel', name: '状态', comparator: this.localComparator, width: 90 },
            { prop: 'note', name: '备注', width: 120 },
        ];
    }

    @Input() set detailShow(value: boolean) {
        if (value) {
            const prop = this.columns.find(th => th.prop === 'id');
            if (prop) {
                prop['cellTemplate'] = this.idTmpl;
            }
        }
    }

    @Input() set data(value: any[]) {
        if (value) {
            const filterColumns = [
                { name: 'building', label: '教学楼' },
                { name: 'groups', label: '一级分类' },
                { name: 'roomType', label: '二级分类' },
                { name: 'name', label: '房间号' },
                { name: 'purpose', label: '功能' },
                { name: 'seatType', label: '桌椅类型' },
                { name: 'department', label: '使用单位' },
                { name: 'statusLabel', label: '状态' }
            ];
            this.setData(value, filterColumns);
        }
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        selected.forEach(t => t.checked = true);
        this.selected.push(...selected);
        this.checkedList.emit(this.selected);
    }
}
