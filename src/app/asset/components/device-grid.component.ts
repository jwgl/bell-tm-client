import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

import { SetFilterComponent } from './set-filter.component';

@Component({
    selector: 'tm-asset-device-grid',
    templateUrl: 'device-grid.component.html',
})
export class DeviceGridComponent {
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
        { field: 'code', headerName: '资产编号', width: 90 },
        { field: 'assetType', headerName: '资产类别', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'name', headerName: '设备名称', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'brand', headerName: '品牌', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'specs', headerName: '规格型号', width: 90 },
        { field: 'parameter', headerName: '参数', width: 90 },
        { field: 'sn', headerName: '设备编号', width: 90 },
        { field: 'unit', headerName: '单位', width: 60 },
        { field: 'pcs', headerName: '数量', width: 60 },
        { field: 'price', headerName: '单价', width: 60 },
        { field: 'dateBought', headerName: '购买时间', width: 90 },
        { field: 'qualifyMonth', headerName: '保质期', width: 90 },
        { field: 'supplier', headerName: '供应商', width: 90 },
        {
            field: 'state', headerName: '状态', filter: 'setFilterComponent',
            valueGetter: this.statusGetter, comparator: this.localComparator, width: 90
        },
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
                .setItems((filters && filters.length > 0 && typeof (filters[0]) === 'string') ? filters
                    .sort((a, b) => a === null ? 1 : a.localeCompare(b)) : filters);
        }
    }

    @Input() set data(value: any[]) {
        this.list = value;
        if (value && value.length > 0) {
            this.ths = this.ths.filter(th => !this.list.every((data: any) => data[th.field] === undefined || data[th.field] === null));
            ['assetType', 'name', 'brand', 'dateBought', 'supplier', 'state']
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
        return { USING: '在用', STANDBY: '备用', REPAIRING: '维修', OFF: '报废',  CLEARANCE: '核销', LOST: '丢失'}[params.data.state];
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
