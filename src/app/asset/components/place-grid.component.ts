import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

import { SetFilterComponent } from './set-filter.component';

@Component({
    selector: 'tm-asset-place-grid',
    templateUrl: 'place-grid.component.html',
})
export class PlaceGridComponent {
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
        { field: 'building', headerName: '教学楼', filter: 'setFilterComponent', width: 90 },
        { field: 'groups', headerName: '一级分类', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'roomType', headerName: '二级分类', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'name', headerName: '房间号', width: 60 },
        { field: 'purpose', headerName: '功能', filter: 'setFilterComponent', width: 90 },
        { field: 'measure', headerName: '面积', width: 60 },
        { field: 'seat', headerName: '座位数', width: 60 },
        { field: 'seatType', headerName: '桌椅类型', filter: 'setFilterComponent', comparator: this.localComparator },
        { field: 'department', headerName: '使用单位', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'status', headerName: '状态', filter: 'setFilterComponent',
            valueGetter: this.statusGetter,  comparator: this.localComparator, width: 90 },
        { field: 'note', headerName: '备注', width: 120 },
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
                .setItems((typeof (filters[0]) === 'string') ? filters
                    .sort((a, b) => a === null ? 1 : a.localeCompare(b)) : filters);
        }
    }

    @Input() set data(value: any[]) {
        this.list = value;
        if (value && value.length > 0) {
            this.ths = this.ths.filter(th => !this.list.every((data: any) => data[th.field] === undefined || data[th.field] === null));
            ['building', 'groups', 'roomType', 'purpose', 'seat', 'seatType', 'department', 'status']
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
        return { ON: '在用', BACKUP: '储备', DELETED: '取消' }[params.data.status];
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
        return `<a href="${url}/${params.value}">${params.node.rowIndex + 1} #${params.value}<fa-icon icon="user"></fa-icon></a>`;
    }

    onSelectionChanged(event) {
        const ids = event.api.getSelectedNodes().map((node: any) => node.data.id);
        this.rowSelected.emit(ids);
    }
}
