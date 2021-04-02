import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { BaseTable } from './baseTable';

@Component({
    selector: 'tm-asset-transfer-table',
    styleUrls: ['filter-group.scss'],
    templateUrl: 'transfer-form-table.component.html',
})
export class TransferFormTableComponent extends BaseTable {
    @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;

    @Input() set data(value: any[]) {
        if (value) {
            const filterColumns = [
                { name: 'type', label: '流转单类型' },
                { name: 'source', label: '源地址' },
                { name: 'target', label: '目标地址' },
                { name: 'status', label: '状态' }
            ];
            this.setData(value, filterColumns);
        }
    }

    @Input() checkAble: boolean;
    @Input() size: string;
    @Output() checkedList = new EventEmitter<any>();

    constructor() {
        super();
        this.columns = [
            { draggable: false, sortable: false, headerCheckboxable: this.checkAble, width: 30, checkboxable: this.checkAble },
            { draggable: false, name: 'ID', prop: 'id', cellTemplate: this.idTmpl, width: 80 },
            { prop: 'type', name: '流转单类型', comparator: this.localComparator, width: 90 },
            { prop: 'dateSubmitted', name: '提交时间', width: 90 },
            { prop: 'operator', name: '申请人', width: 90 },
            { prop: 'dateApproved', name: '审核时间', width: 90 },
            { prop: 'approver', name: '审核员', width: 90 },
            { prop: 'source', name: '源地址', comparator: this.localComparator, width: 120 },
            { prop: 'target', name: '目标地址', comparator: this.localComparator, width: 120 },
            { prop: 'status', name: '状态', comparator: this.localComparator, width: 90 },
            { prop: 'note', name: '备注', width: 150 },
        ];
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        selected.forEach(t => t.checked = true);
        this.selected.push(...selected);
        this.checkedList.emit(this.selected);
      }
}
