import { Component } from '@angular/core';

import { UniversityFormService } from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class UniversityListComponent {
    universities: any[];
    regions: any[];
    majors: any[];

    constructor(private service: UniversityFormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.universities = dto;
    }

    orderBy(key: string) {
        this.universities.sort((a, b) => a[key].localeCompare(b[key]));
    }
}
