import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NumberStringOption } from 'core/options';

import { Question, QuestionOption, QUESTION_TYPES } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-question-editor',
    styleUrls: ['question-editor.component.scss'],
    templateUrl: 'question-editor.component.html',
})
export class QuestionEditorComponent implements OnInit, AfterViewInit {
    @Input()
    question: Question;

    @Input()
    mode: 'edit' | 'create';

    showLabel: boolean;
    showValue: boolean;

    @Output()
    confirm = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    @ViewChild('titleElement')
    titleElementRef: ElementRef;

    ngOnInit() {
        this.showLabel = this.question.options.some(option => !!option.label);
        this.showValue = this.question.options.some(option => !!option.value);
        if (this.mode === 'create') {
            this.updateTypeOption();
        }
    }

    ngAfterViewInit() {
        this.titleElementRef.nativeElement.focus();
    }

    updateTypeOption() {
        this.question.minValue = this.question.typeOptions.min.default;
        this.question.maxValue = this.question.typeOptions.max.default;
        this.question.stepValue = this.question.typeOptions.step.default;
        if (this.question.type === 0 || this.question.type === 3) {
            this.question.openEnded = false;
        }
    }

    onSubmit() {
        this.confirm.emit(this.question);
    }

    onCancel() {
        this.cancel.emit(this.question);
    }

    get questionTypes(): NumberStringOption[] {
        return QUESTION_TYPES;
    }

    onTypeChanged(select: HTMLSelectElement, type: number): void {
        if ((this.question.type === 1 || this.question.type === 2)
            && (type === 0 || type === 3)
            && this.question.options.length > 0) {
            if (window.confirm('修改问题类型将删除所有选项，确定要继续吗？')) {
                this.question.options = [];
            } else {
                select.selectedIndex = QUESTION_TYPES.findIndex(it => it.value === this.question.type);
                return;
            }
        }
        this.question.type = type;
        this.updateTypeOption();
    }

    onMoveupOption(option: QuestionOption): void {
        this.question.moveupItem(option);
    }

    onMovedownOption(option: QuestionOption): void {
        this.question.movedownItem(option);
    }

    onCreateOption(option: QuestionOption): void {
        this.question.addItem(option);
        this.scrollToView();
    }

    onRemoveOption(option: QuestionOption): void {
        this.question.removeItem(option);
        this.scrollToView();
    }

    private scrollToView(): void {
        setTimeout(() => {
            document.getElementById('question-editor').scrollIntoView({
                behavior: 'smooth',
            });
        }, 1);
    }
}
