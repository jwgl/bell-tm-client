import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ResponseItem } from '../../shared/response-form.model';
import { Question } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-response-item-editor',
    styleUrls: ['response-item-editor.component.scss'],
    templateUrl: 'response-item-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseItemEditorComponent {
    @Input()
    responseItem: ResponseItem;

    get question(): Question {
        return this.responseItem.question;
    }

    onRadioToggle(option: any) {
        if ( this.responseItem.choice === option) {
            this.responseItem.choice = undefined;
            this.responseItem.textValue = null;
        }
    }

    onOpenCheckChanged(checked: boolean) {
        if (!checked) {
            this.responseItem.textValue = null;
        }
    }
}
