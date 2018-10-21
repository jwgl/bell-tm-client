import { Component, OnInit } from '@angular/core';

import { ResponseFormService } from '../respondent-questionnaire.service';

@Component({
    styleUrls: ['questionnaire-list.component.scss'],
    templateUrl: 'questionnaire-list.component.html',
})
export class QuestionnaireListComponent implements OnInit {
    questionnaires: any[];

    constructor(private service: ResponseFormService) { }

    ngOnInit(): void {
        this.service.loadList().subscribe(data => {
            this.questionnaires = data;
        });
    }
}
