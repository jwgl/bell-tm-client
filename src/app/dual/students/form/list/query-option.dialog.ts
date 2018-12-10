import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { StudentAdminFormService } from '../form.service';

@Component({
    templateUrl: 'query-option.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class QueryDialog extends BaseDialog {
    regions: any[];
    grades: any[];
    subjects: any[];
    queryOptions: any = {};

    constructor(private service: StudentAdminFormService) {
        super();
    }

    get validate(): boolean {
        return !(this.queryOptions.groupId || this.queryOptions.subjectId ||
            this.queryOptions.grade || this.queryOptions.studentName || this.queryOptions.studentId);
    }

    protected onOpening(): Observable<any> {
        this.service.loadDataForCreate().subscribe((dto: any) => {
            this.regions = dto.agreementRegions;
            this.grades = dto.grades;
            this.subjects = dto.subjects;
        });
        return null;
    }

    protected onConfirmed(): any {
        return this.queryOptions;
    }
}
