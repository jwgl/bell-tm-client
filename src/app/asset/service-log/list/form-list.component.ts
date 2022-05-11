import { Component } from '@angular/core';

import { ServiceLogForm } from '../form.model';
import { ServiceLogFormService } from '../form.service';
@Component({
    templateUrl: 'form-list.component.html',
})
export class ServiceLogFormListComponent {
    logs: ServiceLogForm[];
    fields: any;
    isEditor: boolean;

    constructor(private service: ServiceLogFormService) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.logs = dto.logs.map(it => new ServiceLogForm(it));
            this.fields = dto.fields;
            this.isEditor = dto.isEditor;
        });
    }

    saveFields(fields: any) {
        this.service.createHindField({ tableName: 'serviceLog', fields }).subscribe();
    }
}
