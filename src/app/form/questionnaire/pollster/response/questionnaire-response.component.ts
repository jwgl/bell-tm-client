import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionnaireFormService } from '../questionnaire-form.service';
import { Questionnaire, Question } from '../../shared/questionnaire-form.model';
import './questionnaire-response.model';
import { QuestionResponseComponent } from './question-response.component';

@Component({
    styleUrls: ['questionnaire-response.component.scss'],
    templateUrl: 'questionnaire-response.component.html',
})
export class QuestionnaireResponseComponent {
    questionnaire: Questionnaire;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: QuestionnaireFormService,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadResponses(params['id']).subscribe(dto => this.onLoadData(dto));
        });
    }

    onLoadData(dto: any) {
        this.questionnaire = new Questionnaire(dto.questionnaire);
        this.questionnaire.initStats(dto.stats);
    }

    onViewOpenResponses(question: Question, questionResponse: QuestionResponseComponent) {
        this.service.loadOpenResponses(this.questionnaire.id, question.id).subscribe(result => {
            question.openResponses = result;
            questionResponse.update();
        });
    }
}
