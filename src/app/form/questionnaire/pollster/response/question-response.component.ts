import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { Question } from '../../shared/questionnaire-form.model';
import './questionnaire-response.model';


@Component({
    selector: 'tm-question-response',
    styleUrls: ['question-response.component.scss'],
    templateUrl: 'question-response.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionResponseComponent {
    @Input()
    question: Question;

    @Output()
    viewOpenResponses = new EventEmitter<Question>();

    @ViewChild('openResponseTable')
    openResponseTable: ElementRef;

    showTitle: boolean;
    showOpenResponses: boolean;
    constructor(private changeDetactorRef: ChangeDetectorRef) { }

    update() {
        if (this.question.openResponses) {
            this.showOpenResponses = true;
            this.question.openResponseTotalCount = this.question.openResponses.reduce((sum, item) => sum + item.count, 0);
        }
        this.changeDetactorRef.detectChanges();
    }

    onViewOpenResponses() {
        if (!this.question.openResponses) {
            this.viewOpenResponses.emit(this.question);
        } else {
            this.showOpenResponses = !this.showOpenResponses;
            this.changeDetactorRef.detectChanges();
        }
    }

    toggleTitle() {
        this.showTitle = !this.showTitle;
        this.changeDetactorRef.detectChanges();
    }

    copyTable(table: HTMLTableElement) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(table);
        selection.addRange(range);
        document.execCommand('Copy');
        selection.removeAllRanges();
    }

    copyOpenResponseTable() {
        this.copyTable(this.openResponseTable.nativeElement);
    }

    get supportCopy(): boolean {
        return !!document.createRange && !!window.getSelection;
    }
}
