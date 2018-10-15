import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { StringStringOption } from 'core/options';

import { QuestionnaireFormService } from '../questionnaire-form.service';
import { Questionnaire, Question } from '../../shared/questionnaire-form.model';
import './form-editor.model';
import { SURVEY_SCOPES } from '../../shared/survey-scope.model';
import { RESPONDENT_TYPES } from '../../shared/respondent-type.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class QuestionnaireEditorComponent {
    form: Questionnaire;
    surveyScopes: StringStringOption[];
    respondentTypes: StringStringOption[];
    today: Date;
    selectedQuestion: Question;
    saving = false;

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
        this.surveyScopes = SURVEY_SCOPES.filter(it => dto.surveyScopes.includes(it.value)) ;
        this.respondentTypes = RESPONDENT_TYPES.filter(it => dto.respondentTypes.includes(it.value));
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
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    private scrollToView(): void {
        setTimeout(() => {
            document.getElementById('question-editor').scrollIntoView();
        }, 1);
    }
}
