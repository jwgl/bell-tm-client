import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { AgreementFormService } from '../form/form.service';

@Component({
    templateUrl: 'filter.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class AgreementFilterDialog extends BaseDialog {
    filters: any = {};
    majors: any[];
    regions: any[];

    constructor(private service: AgreementFormService) {
        super();
        if (this.service.filters) {
            this.filters = this.service.filters;
        }
    }

    filterByDepartment(name: string) {
        return (major: any) => major.departmentName === name;
    }

    protected onOpening(): Observable<any> {
        this.majors = this.options.majors.filter((m: any) => m.enabled);
        this.regions = this.options.regions;
        return null;
    }

    protected onConfirmed(): any {
        this.service.filters = this.filters;
        return this.filters;
    }
}
