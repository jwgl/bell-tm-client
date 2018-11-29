import { Component, Input } from '@angular/core';

import { ResponseItem } from '../../shared/response-form.model';
import { Question } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-ballot-response-item-editor',
    styleUrls: ['ballot-response-item-editor.component.scss'],
    templateUrl: 'ballot-response-item-editor.component.html',
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
