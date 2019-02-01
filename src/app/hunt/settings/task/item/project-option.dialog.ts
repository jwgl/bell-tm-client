import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { LevelList, ReportTypeList } from '../../shared/constants';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'project-option.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ProjectOptionDialog extends BaseDialog {
    reportTypes = ReportTypeList;
    subtypes: any;
    levels = LevelList;
    departments: any;
    queryOptions: any = {};
    middleYears: any;
    knotYears: any;
    departmentSelected: any[];
    subtypeSelected: any[];
    middleYearSelected: any[];
    knotYearSelected: any[];

    protected onOpening(): Observable<any> {

        this.subtypes = this.options.subtypes;
        this.departments = this.options.departments;
        this.middleYears = this.options.middleYears;
        this.knotYears = this.options.knotYears;
        return null;
    }

    protected onConfirmed(): any {
        this.queryOptions.departmentIds = this.departmentSelected ? this.departmentSelected.map(d => d.id) : '';
        this.queryOptions.subtypeIds = this.subtypeSelected ? this.subtypeSelected.map(s => s.id) : null;
        this.queryOptions.middleYears = this.middleYearSelected ? this.middleYearSelected.map(m => m.middleYear) : null;
        this.queryOptions.knotYears = this.knotYearSelected ? this.knotYearSelected.map(s => s.knotYear) : null;
        return this.queryOptions;
    }
}
