import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { ResponseItem } from '../../shared/response-form.model';
import { Question } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';

@Component({
    selector: 'tm-response-item-editor',
    styleUrls: ['response-item-editor.component.scss'],
    templateUrl: 'response-item-editor.component.html',
})
export class ResponseItemEditorComponent implements AfterViewInit {
    @Input()
    responseItem: ResponseItem;

    @Input()
    disabled: boolean;

    @ViewChild('rangeElement', { static: false })
    rangeElement: ElementRef;

    constructor() { }

    get question(): Question {
        return this.responseItem.question;
    }

    onOpenCheckChanged(checked: boolean) {
        if (!checked) {
            this.responseItem.textValue = null;
        }
    }

    ngAfterViewInit(): void {
        if (this.responseItem.question.type === QuestionType.SCALE) {
            if (!this.responseItem.intValue || this.responseItem.intValue !== +this.rangeElement.nativeElement.value) {
                setTimeout(() => {
                    this.responseItem.intValue = +this.rangeElement.nativeElement.value;
                }, 0);
            }
        }
    }
}
