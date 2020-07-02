import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

import { SetFilterComponent } from './set-filter.component';
import { Level, levelLabels, ProjectStatus, projectStatusLabels, Conclusion, conclusionLabels } from '../settings/shared/constants';

@Component({
    selector: 'hunt-grid',
    templateUrl: 'hunt-grid.component.html',
})
export class HuntGridComponent {
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
        { field: 'locked', headerName: '锁', width: 40, cellRenderer: this.lockedCellRender },
        { field: 'countExpert', headerName: '专家数', width: 60 },
        { field: 'departmentName', headerName: '单位', filter: 'setFilterComponent', comparator: this.localComparator, width: 90 },
        { field: 'name', headerName: '项目名称', comparator: this.localComparator },
        { field: 'code', headerName: '项目编号', width: 90 },
        { field: 'level', headerName: '等级', valueGetter: this.levelGetter, width: 70 },
        { field: 'parentName', headerName: '项目大类', filter: 'setFilterComponent', comparator: this.localComparator },
        { field: 'subtype', headerName: '项目类型', filter: 'setFilterComponent', comparator: this.localComparator },
        { field: 'principalName', headerName: '负责人', comparator: this.localComparator, width: 90 },
        { field: 'office', headerName: '岗位', comparator: this.localComparator, width: 90 },
        { field: 'title', headerName: '职称', comparator: this.localComparator, width: 90 },
        { field: 'degree', headerName: '学位', comparator: this.localComparator, width: 90 },
        { field: 'phone', headerName: '电话', width: 90 },
        { field: 'dateStart', headerName: '立项时间', filter: 'setFilterComponent', width: 90, valueFormatter: this.formatDate },
        { field: 'middleYear', headerName: '拟中期', filter: 'setFilterComponent', width: 60 },
        { field: 'knotYear', headerName: '拟结题', filter: 'setFilterComponent', width: 60 },
        { field: 'dateFinished', headerName: '结题时间', width: 90 },
        { field: 'delayTimes', headerName: '延期次数', width: 60 },
        { field: 'date', headerName: '申请时间', width: 60, valueFormatter: this.formatDate },
        { field: 'status', headerName: '建设情况', valueGetter: this.statusGetter, width: 90 },
        { field: 'state', headerName: '审批状态', valueGetter: this.stateGetter, width: 90 },
        { field: 'conclusion', headerName: '结论', valueGetter: this.conclusionGetter, width: 90 },
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
            ['departmentName', 'parentName', 'subtype', 'dateStart', 'middleYear', 'knotYear', 'delayTimes']
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

    lockedCellRender(params: any) {
        return params.data.locked ? 'Y' : 'N';
    }

    levelGetter(params: any) {
        return levelLabels[Level[params.data.level]].text;
    }

    statusGetter(params: any) {
        return projectStatusLabels[ProjectStatus[params.data.status]].text;
    }

    stateGetter(params: any) {
        return { SUBMITTED: '待审核', CHECKED: '待审批', FINISHED: '完成' }[params.data.state];
    }

    conclusionGetter(params: any) {
        const obj = conclusionLabels[Conclusion[params.data.conclusion]];
        return obj ? obj.text : '';
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
