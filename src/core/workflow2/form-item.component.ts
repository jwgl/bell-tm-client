import { Component, ContentChild, TemplateRef, EventEmitter, Output, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestEditService } from '../rest';
import { CommonDialog } from '../common-dialogs';
import { WorkflowForm, WorkflowFormConvert } from './form-item.model';
import { SubmitOptions } from './workflow.service';

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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        @Inject('WORKFLOW_ITEM_SERVICE')
        private itemService: RestEditService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.loadItem(params['id']);
        });
    }

    loadItem(id: any) {
        this.itemService.loadItem(id).subscribe(dto => {
            this.form = this.convert(dto);
        });
    }

    remove(id: any) {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.itemService.delete(id).subscribe(() => {
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
}
