import {Component} from '@angular/core';

import * as _ from 'lodash';

import { PublicDepartmentService } from './public.service';

@Component({
    styleUrls: ['public-list.component.scss'],
    templateUrl: 'public-list.component.html',
})
export class PublicDepartmentComponent {
    agreementSubjects: any[];

    constructor(private service: PublicDepartmentService) {
        this.service.loadList().subscribe(dto => {
            this.agreementSubjects = dto;
        });
    }

    filterBySubject(name: string) {
        return (major: any) => major.subjectName === name;
    }
}
