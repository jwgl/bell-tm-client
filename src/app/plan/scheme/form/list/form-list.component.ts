import { Component, OnInit } from '@angular/core';

import { SchemeFormService } from '../scheme-form.service';

/**
 * 所有者教学计划列表。
 */
@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class SchemeFormListComponent implements OnInit {
    subjects: any[];

    constructor(private service: SchemeFormService) { }

    ngOnInit(): void {
        this.service.loadList().subscribe(data => this.subjects = data);
    }
}
