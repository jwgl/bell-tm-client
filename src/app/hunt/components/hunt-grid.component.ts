import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

import { SetFilterComponent } from './set-filter.component';
import { Level, levelLabels, ProjectStatus, projectStatusLabels } from '../settings/shared/constants';

@Component({
    selector: 'hunt-grid',
    templateUrl: 'hunt-grid.component.html',
})
export class HuntGridComponent {
    @Input()
    cols: any;
    gridApi: any;
    gridColumnApi: any;
    list: any;
    
    ths = [
        {field: 'id', headerName: 'ID', width: 80, cellRenderer: this.linkCellRender},
        {field: 'name', headerName: '项目名称', comparator: this.localComparator},
        {field: 'code', headerName: '项目编号', width: 90},
        {field: 'level', headerName: '等级', valueGetter: this.levelGetter, width: 70},
        {field: 'subtype', headerName: '项目类型', filter: "setFilterComponent", comparator: this.localComparator},
        {field: 'principalName', headerName: '负责人', comparator: this.localComparator, width: 90},
        {field: 'office', headerName: '岗位', comparator: this.localComparator, width: 90},
        {field: 'title', headerName: '职称', comparator: this.localComparator, width: 90},
        {field: 'degree', headerName: '学位', comparator: this.localComparator, width: 90},
        {field: 'dateStart', headerName: '立项时间', filter: "setFilterComponent", width: 90, valueFormatter: this.formatDate},
        {field: 'middleYear', headerName: '中期', width: 60},
        {field: 'knotYear', headerName: '结题', width: 60},
        {field: 'dateFinished', headerName: '结题时间', width: 90},
        {field: 'delayTimes', headerName: '延期', width: 60},
        {field: 'status', headerName: '建设情况', valueGetter: this.statusGetter, width: 90},
    ];

    initFilter(key: string) {
        const filters = _.chain(this.list)
                    .map(data => data[key])
                    .uniq()
                    .sort()
                    .value();
        if (filters && filters.length > 0) {
            this.gridApi
            .getFilterInstance(key)
            .getFrameworkComponentInstance()
            .setItems((filters && filters.length > 0 && typeof(filters[0]) === "string") ? filters.sort((a, b) => a.localeCompare(b)) : filters);
        }
    }

    @Input() set data(value: any[]) {
        this.list = value;
        if (value && value.length > 0) {
            this.ths = this.ths.filter(th => !this.list.every((data: any) => data[th.field] === undefined));
            ['subtype', 'dateStart', 'middleYear', 'knotYear', 'delayTimes'].forEach(item => {
                const th = this.ths.find(col => col.field === item);
                if (th && th.filter === "setFilterComponent") {
                    console.log(item);
                    this.initFilter(item);
                }
            });
        }
    };

    frameworkComponents: any;

    gridOptions = {
        defaultColDef: {
            sortable: true,
            resizable: true,
            cellClassRules: {
                'badge badge-pill badge-secondary': params => params.value === '未立项',
                'badge badge-pill badge-info': params => params.value === '在研',
                'badge badge-pill badge-success': params => params.value === '结题',
                'badge badge-pill badge-danger': params => params.value === '终止',
            },
        },        
    };

    constructor() {
        this.frameworkComponents = { setFilterComponent: SetFilterComponent };
     }

    localComparator(str1: string, str2: string): number {
        return String(str1).localeCompare(str2);
    }

    levelGetter(params: any) {
        return levelLabels[Level[params.data.level]].text;
    }

    statusGetter(params: any) {
        return projectStatusLabels[ProjectStatus[params.data.status]].text;
    }

    formatDate(params: any) {
        return params.value ? params.value.substring(0, 7) : null;
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // params.api.sizeColumnsToFit();
    }

    linkCellRender(params: any) {
        const url = window.location.pathname;
        return `<a href="${url}/${params.value}">${params.node.rowIndex + 1} #${params.value}</a>`;
    }
    
}
