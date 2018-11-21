import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ResponseFormService } from '../respondent-questionnaire.service';

@Component({
    styleUrls: ['questionnaire-list.component.scss'],
    templateUrl: 'questionnaire-list.component.html',
})
export class QuestionnaireListComponent {
    questionnaires: any[];
    loading = false;
    category: string;

    categories = [
        { label: '进行中', category: 'open' },
        { label: '已提交', category: 'submitted' },
    ];

    constructor(
        private route: ActivatedRoute,
        private service: ResponseFormService,
    ) {
        this.route.data.subscribe(data => {
            this.loading = true;
            this.category = data['category'];
            this.service.loadList({ category: this.category }).subscribe(questionnaires => {
                this.questionnaires = questionnaires;
                this.loading = false;
            });
        });
    }

    get categoryLabel(): string {
        return this.categories.find(it => it.category === this.category).label;
    }
}
