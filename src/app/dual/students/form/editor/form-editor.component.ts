import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { StudentAdminFormService } from '../form.service';

@Component({
    templateUrl: 'form-editor.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class StudentAdminDialog extends BaseDialog {
    regions: any[];
    form: any = {};

    constructor(private service: StudentAdminFormService) {
        super();
    }

    get validate(): boolean {
        if (!this.form.regionId || !this.form.studentIds) {
            return true;
        }
    }

    protected onOpening(): Observable<any> {
        this.service.loadDataForCreate().subscribe((dto: any) => {
            this.regions = dto.agreementRegions;
        });
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }
}
