import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { LevelList, projectStatusList } from '../../../../settings/shared/constants';

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
    subtypeSelected: any[];
    middleYearSelected: any[];
    knotYearSelected: any[];

    protected onOpening(): Observable<any> {

        this.subtypes = this.options.subtypes;
        this.middleYears = this.options.middleYears;
        this.knotYears = this.options.knotYears;
        return null;
    }

    protected onConfirmed(): any {
        this.queryOptions.subtypeIds = this.subtypeSelected ? this.subtypeSelected.map(s => s.id) : null;
        this.queryOptions.middleYears = this.middleYearSelected ? this.middleYearSelected.map(m => m.middleYear) : null;
        this.queryOptions.knotYears = this.knotYearSelected ? this.knotYearSelected.map(s => s.knotYear) : null;
        return this.queryOptions;
    }
}
