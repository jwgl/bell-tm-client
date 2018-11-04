import { Component, OnInit } from '@angular/core';

import { QuestionnaireFormService } from '../questionnaire-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class QuestionnaireFormListComponent implements OnInit {
    forms: any[];
    totalCount: number;
    max = 20;

    constructor(private service: QuestionnaireFormService) { }

    ngOnInit(): void {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
        });
    }
}
