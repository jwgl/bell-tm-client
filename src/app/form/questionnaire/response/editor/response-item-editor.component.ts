import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { ResponseItem } from '../../shared/response-form.model';
import { Question } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';

@Component({
    selector: 'tm-response-item-editor',
    styleUrls: ['response-item-editor.component.scss'],
    templateUrl: 'response-item-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseItemEditorComponent implements AfterViewInit {
    @Input()
    responseItem: ResponseItem;

    @Input()
    disabled: boolean;

    @ViewChild('rangeElement')
    rangeElement: ElementRef;

    constructor(private changeRef: ChangeDetectorRef) { }

    get question(): Question {
        return this.responseItem.question;
    }

    onRadioToggle(option: any) {
        if (this.responseItem.choice === option) {
            this.responseItem.choice = undefined;
            this.responseItem.textValue = null;
        }
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
                    this.changeRef.detectChanges();
                }, 0);
            }
        }
    }
}
