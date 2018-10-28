import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Question } from '../../shared/questionnaire-form.model';
import './questionnaire-response.model';

@Component({
    selector: 'tm-ballot-question-response',
    styleUrls: ['ballot-question-response.component.scss'],
    templateUrl: 'ballot-question-response.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallotQuestionResponseComponent {
    @Input()
    question: Question;

    copyTable(table: HTMLTableElement) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(table);
        selection.addRange(range);
        document.execCommand('Copy');
        selection.removeAllRanges();
    }

    get supportCopy(): boolean {
        return !!document.createRange && !!window.getSelection;
    }
}
