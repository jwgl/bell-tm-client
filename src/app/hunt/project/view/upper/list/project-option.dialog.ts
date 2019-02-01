import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { LevelList, projectStatusList } from '../../../../settings/shared/constants';
import { ProjectService } from '../viewer.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'project-option.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ProjectOptionDialog extends BaseDialog {
    subtypes: any;
    levels = LevelList;
    projectStatuses = projectStatusList;
    queryOptions: any = {};
    middleYears: any;
    knotYears: any;
    departments: any;
    subtypeSelected: any[];
    middleYearSelected: any[];
    knotYearSelected: any[];

    constructor(private service: ProjectService) {
        super();
        if (this.service.queryOptions) {
            this.queryOptions = this.service.queryOptions;
        }
    }

    protected onOpening(): Observable<any> {
        this.subtypes = this.options.subtypes;
        this.middleYears = this.options.middleYears;
        this.knotYears = this.options.knotYears;
        this.departments = this.options.departments;
        return null;
    }

    protected onConfirmed(): any {
        this.queryOptions.subtypeIds = this.subtypeSelected ? this.subtypeSelected.map(s => s.id) : null;
        this.queryOptions.middleYears = this.middleYearSelected ? this.middleYearSelected.map(m => m.middleYear) : null;
        this.queryOptions.knotYears = this.knotYearSelected ? this.knotYearSelected.map(s => s.knotYear) : null;
        this.service.queryOptions = this.queryOptions;
        return this.queryOptions;
    }
}
