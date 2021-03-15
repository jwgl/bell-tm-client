import { NgModule, Type, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Resolve, ResolveData } from '@angular/router';

import { IconModule } from '../icon';
import { CommonDirectivesModule } from '../common-directives';
import { Dialog } from '../dialogs';
import { AuthService } from '../auth/auth.service';
import { ApiUrl } from '../rest';

import { ReviewItemResolve } from './review-item.resolve';
import { ReviewListResolve } from './review-list.resolve';
import { WorkflowReviewListComponent } from './review-list.component';
import { WorkflowReviewItemComponent } from './review-item.component';
import { WorkflowFormItemComponent } from './form-item.component';
import { WorkflowStatusTextPipe, WorkflowStatusClassPipe, UserTaskStatusClassPipe} from './workflow-status.pipe';
import { FormStatusTextPipe, FormStatusClassPipe } from './form-status.pipe';
import { WorkflowStatusComponent } from './workflow-status.component';
import { WorkflowTaskListComponent } from './task-list.component';
import { WorkflowResultTextPipe } from './workflow-result.pipe';
import { WorkflowInitiatorCompleteButtonDirective } from './initiator-complete.button';
import { WorkflowInitiatorCompleteDialog } from './initiator-complete.dialog';
import { WorkflowSubmitButtonDirective } from './submit.button';
import { SubmitOptions, InitiatorCompleteOptions, WorkflowSubmitService} from './workflow-submit.service'; 
import { WorkflowReviewItemFormViewDirective, WorkflowReviewItemTaskEditorDirective } from './review-item.directive';
import { WorkflowCompleteDialog } from './complete.dialog';
import { WorkflowService } from './workflow-review.service';
import { CompleteActionClassPipe, CompleteActionTextPipe } from './complete-action.pipe';

function userIdApiUrlFactory(auth: AuthService, url: string) {
    return new ApiUrl(url, { userId: auth.userInfo.id });
}

function apiServiceFactory(service: { api: ApiUrl }) {
    return service.api;
}

export function buildReviewRoutings(): Routes {
    return [{
        path: '',
        component: WorkflowReviewListComponent,
        resolve: { list: ReviewListResolve },
        children: [{
            path: ':id',
            component: WorkflowReviewItemComponent,// itemType,
            resolve: { item: ReviewItemResolve },
        }],
    }];
}

const WORKFLOW_DIALOGS: any[] = [
    WorkflowInitiatorCompleteDialog,
    WorkflowCompleteDialog,
];

const WORKFLOW_BUTTONS: any[] = [
    WorkflowSubmitButtonDirective,
    WorkflowInitiatorCompleteButtonDirective,
];

const WORKFLOW_COMPONENTS: any[] = [
    CompleteActionClassPipe,
    CompleteActionTextPipe,
    FormStatusClassPipe,
    FormStatusTextPipe,
    UserTaskStatusClassPipe,
    WorkflowFormItemComponent,
    WorkflowResultTextPipe,
    WorkflowReviewItemComponent,
    WorkflowReviewItemFormViewDirective,
    WorkflowReviewItemTaskEditorDirective,
    WorkflowReviewListComponent,
    WorkflowStatusClassPipe,
    WorkflowStatusComponent,
    WorkflowStatusTextPipe,
    WorkflowTaskListComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        IconModule,
        CommonDirectivesModule,
    ],
    declarations: [
        WORKFLOW_DIALOGS,
        WORKFLOW_BUTTONS,
        WORKFLOW_COMPONENTS,
    ],
    providers: [
        Dialog,
        WorkflowService,
        WorkflowSubmitService,
        ReviewItemResolve,
        ReviewListResolve,
    ],
    exports: [
        WORKFLOW_BUTTONS,
        WORKFLOW_COMPONENTS,
    ],
    entryComponents: [
        WORKFLOW_DIALOGS,
    ],
})
export class Workflow2Module {
    static forReview(taskUrl: string, stepUrl: string, viewer: Type<any> = null, itemConstructor:new (any) => any = null): ModuleWithProviders<Workflow2Module> {
        return {
            ngModule: Workflow2Module,
            providers: [{
                provide: '__WORKFLOW_TASK_API_URL_INTERNAL__',
                useValue: taskUrl,
            }, {
                provide: 'WORKFLOW_TASK_API_URL',
                useFactory: userIdApiUrlFactory,
                deps: [
                    AuthService,
                    '__WORKFLOW_TASK_API_URL_INTERNAL__'
                ],
            }, {
                provide: '__WORKFLOW_STEP_API_URL_INTERNAL__',
                useValue: stepUrl,
            }, {
                provide: 'WORKFLOW_STEP_API_URL',
                useFactory: userIdApiUrlFactory,
                deps: [
                    AuthService,
                    '__WORKFLOW_STEP_API_URL_INTERNAL__',
                ],
            }, {
                provide: 'WORKFLOW_ITEM_VIEWER',
                useValue: viewer,
            }, {
                provide: 'WORKFLOW_ITEM_CONSTRUCTOR',
                useValue: itemConstructor,
            }],
        };
    }

    static forSubmit<T extends { api: ApiUrl }>(serviceType: Type<T>): ModuleWithProviders<Workflow2Module> {
        return {
            ngModule: Workflow2Module,
            providers: [{
                provide: 'WORKFLOW_ITEM_SERVICE',
                useExisting: serviceType,
            }, {
                provide: 'WORKFLOW_SUBMIT_API_URL',
                useFactory: apiServiceFactory,
                deps: [serviceType],
            }],
        };
    }
}
