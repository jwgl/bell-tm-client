import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { NumberStringOption } from 'core/options';

import { QuestionnaireFormService } from '../questionnaire-form.service';
import { Questionnaire, Question } from '../../shared/questionnaire-form.model';
import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class QuestionnaireEditorComponent {
    form: Questionnaire;
    surveyScopes: NumberStringOption[];
    respondentTypes: NumberStringOption[];
    today: Date;
    selectedQuestion: Question;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: QuestionnaireFormService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
                    break;
            }
        });
    }

    onLoadData(dto: any) {
        this.form = new Questionnaire(dto.form);
        this.surveyScopes = dto.surveyScopes;
        this.respondentTypes = dto.respondentTypes;
        this.today = new Date(dto.today);
    }

    onCreateQuestion() {
        this.selectedQuestion = Question.newInstance(this.form.questions.length);
        this.scrollToView()
    }

    onQuestionCreated(question: Question) {
        this.form.addItem(question);
        this.selectedQuestion = null;
    }

    onEditQuestion(question: Question) {
        this.selectedQuestion = question.clone();
        this.scrollToView()
    }

    onQuestionUpdated(question: Question) {
        this.form.updateItem(question);
        this.selectedQuestion = null;
    }

    onQuestionCanceled(question: Question) {
        this.selectedQuestion = null;
    }

    save() {
        console.log(this.form.toServerDto());
    }

    private scrollToView(): void {
        setTimeout(() => {
            document.getElementById('question-editor').scrollIntoView();
        }, 1);
    }
}
