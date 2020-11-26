import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

import { SetFilterComponent } from './set-filter.component';

@Component({
    selector: 'tm-asset-transfer-grid',
    templateUrl: 'transfer-form-grid.component.html',
})
export class TransferFormGridComponent {
    gridApi: any;
    gridColumnApi: any;
    list: any;
    reflesh: boolean;
    rowSelection = 'multiple';
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();
    frameworkComponents: any;
    gridOptions = {
        defaultColDef: {
            sortable: true,
            resizable: true,
        },
    };
    ths = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            cellRenderer: this.linkCellRender,
            checkboxSelection: false,
            headerCheckboxSelection: false,
            headerCheckboxSelectionFilteredOnly: false,
        },
        { field: 'type', headerName: '流转单类型', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'dateSubmitted', headerName: '提交时间', width: 90 },
        { field: 'operator', headerName: '申请人', width: 90 },
        { field: 'dateApproved', headerName: '审核时间', width: 90 },
        { field: 'approver', headerName: '审核员', width: 90 },
        { field: 'source', headerName: '源地址', filter: 'setFilterComponent', comparator: this.localComparator, width: 120 },
        { field: 'target', headerName: '目标地址', filter: 'setFilterComponent', comparator: this.localComparator, width: 120 },
        { field: 'note', headerName: '备注', width: 150 },
        {
            field: 'status', headerName: '状态', filter: 'setFilterComponent',
            comparator: this.localComparator, width: 90
        },
        { field: 'note', headerName: '备注', width: 150 },
    ];

    initFilter(key: string) {
        const filters = _.chain(this.list)
            .map(data => data[key])
            .uniq()
            .sort()
            .value();
        if (filters && filters.length > 0 && this.gridApi) {
            this.gridApi
                .getFilterInstance(key)
                .getFrameworkComponentInstance()
                .setItems((filters && filters.length > 0 && typeof (filters[0]) === 'string') ? filters
                    .sort((a, b) => a === null ? 1 : a.localeCompare(b)) : filters);
        }
    }

    @Input() set data(value: any[]) {
        this.list = value;
        if (value && value.length > 0) {
            this.ths = this.ths.filter(th => !this.list.every((data: any) => data[th.field] === undefined || data[th.field] === null));
            ['type', 'source', 'target', 'status']
                .forEach(item => {
                    const th = this.ths.find(col => col.field === item);
                    if (th && th.filter === 'setFilterComponent') {
                        this.initFilter(item);
                    }
                });
        }
    }

    @Input() set cols(value: any[]) {
        this.ths = this.ths.concat(value);
    }

    @Input() set flush(value: boolean) {
        if (this.reflesh !== value) {
            this.reflesh = value;
            this.gridApi.refreshCells({ force: true });
        }
    }

    @Input() set checkboxSelection(value: boolean) {
        if (value) {
            const field = this.ths.find(th => th.field === 'id');
            if (field) {
                field.checkboxSelection = true;
                field.headerCheckboxSelection = true;
                field.headerCheckboxSelectionFilteredOnly = true;
                field.width = 100;
            }
        }
    }

    constructor() {
        this.frameworkComponents = { setFilterComponent: SetFilterComponent };
    }

    localComparator(str1: string, str2: string): number {
        return String(str1).localeCompare(str2);
    }

    statusGetter(params: any) {
        return { CREATED: '未提交', SUBMITTED: '提交', APPROVED: '同意', REJECTED: '不同意'}[params.data.status];
    }

    formatDate(params: any) {
        return params.value ? params.value.substring(0, 7) : null;
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    linkCellRender(params: any) {
        const url = window.location.pathname;
        return `<a href="${url}/${params.value}">${params.node.rowIndex + 1} #${params.value}</a>`;
    }

    onSelectionChanged(event) {
        const ids = event.api.getSelectedNodes().map((node: any) => node.data.id);
        this.rowSelected.emit(ids);
    }
}
