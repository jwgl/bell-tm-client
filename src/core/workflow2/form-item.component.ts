import { Component, ContentChild, TemplateRef, EventEmitter, Output, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestEditService } from '../rest';
import { CommonDialog } from '../common-dialogs';
import { WorkflowForm, WorkflowFormConvert } from './form-item.model';
import { InitiatorCompleteOptions, SubmitOptions } from './workflow-submit.service';

@Component({
    selector: 'tm-workflow-form-item',
    templateUrl: 'form-item.component.html',
})
export class WorkflowFormItemComponent implements OnInit {
    @ContentChild('toolbarTpl')
    toolbarTemplate: TemplateRef<any>;

    @ContentChild('viewerTpl')
    viewerTemplate: TemplateRef<any>;

    @Input()
    convert: WorkflowFormConvert;

    form: WorkflowForm;

    @Output()
    itemLoaded = new EventEmitter<any>(true);

    itemId: any;
    workflowTaskId: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        @Inject('WORKFLOW_ITEM_SERVICE')
        private itemService: RestEditService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.itemId = params['id'];
            this.loadItem(params['workflowTaskId']);
        });
    }

    loadItem(workflowTaskId?: string) {
        this.workflowTaskId = workflowTaskId;
        (this.workflowTaskId
            ? this.itemService.loadItem(this.itemId, { workflowTaskId: this.workflowTaskId })
            : this.itemService.loadItem(this.itemId)
        ).subscribe(dto => {
            this.form = this.convert(dto);
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.itemService.delete(this.itemId).subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
        });
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.form.id,
            validate: this.form.validate ? this.form.validate.bind(this.form) : null,
        };
    }

    onCompleted() {
        this.router.navigate(['../', this.itemId], { relativeTo: this.route });
    }

    getCompleteOptions(action: string): InitiatorCompleteOptions {
        return {
            id: this.itemId,
            workflowTaskId: this.workflowTaskId,
            result: {
                key: this.form.taskVariable.name,
                value: action
            },
            validate: this.form.validate ? this.form.validate.bind(this.form) : null,
        };
    }
}
