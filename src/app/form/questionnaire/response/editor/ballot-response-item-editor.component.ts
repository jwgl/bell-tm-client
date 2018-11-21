import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ResponseItem } from '../../shared/response-form.model';
import { Question, QuestionOption } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';

@Component({
    selector: 'tm-ballot-response-item-editor',
    styleUrls: ['ballot-response-item-editor.component.scss'],
    templateUrl: 'ballot-response-item-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallotResponseItemEditorComponent {
    @Input()
    responseItem: ResponseItem;

    @Input()
    disabled: boolean;

    constructor() { }

    get question(): Question {
        return this.responseItem.question;
    }
}
