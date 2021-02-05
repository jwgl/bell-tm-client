import { NgModule, Type, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Resolve, ResolveData } from '@angular/router';

import { CommonDirectivesModule } from '../common-directives';
import { Dialog } from '../dialogs';
import { WorkflowAcceptButtonDirective } from './accept.button';
import { WorkflowAcceptDialog } from './accept.dialog';
import { WorkflowNextButtonDirective } from './next.button';
import { WorkflowNextDialog } from './next.dialog';
import { WorkflowRollbackButtonDirective } from './rollback.button';
import { WorkflowRollbackDialog } from './rollback.dialog';
import { WorkflowRejectButtonDirective } from './reject.button';
import { WorkflowRejectDialog } from './reject.dialog';
import { WorkflowRevokeButtonDirective } from './revoke.button';
import { WorkflowRevokeDialog } from './revoke.dialog';
import { WorkflowSubmitButtonDirective } from './submit.button';
import { WorkflowSubmitDialog } from './submit.dialog';
import { WorkflowReviewButtonDirective } from './review.button';
import { WorkflowReviewDialog } from './review.dialog';
import {
    NextOptions,
    ReviewOptions,
    RevokeOptions,
    SubmitOptions,
    Workflow,
} from './workflow.service';
import { WorkitemStatusTextPipe } from './workitem-status.pipe';
import { WorkitemStatusComponent } from './workitem-status.component';
import { WorkflowWorkitemsButtonDirective } from './workitems.button';
import { WorkflowWorkitemsDialog } from './workitems.dialog';

import { WorkflowItemResolve } from './item.resolve';
import { WorkflowListResolve } from './list.resolve';

import { WorkflowListGroupComponent } from './list-group.component';
import { WorkflowNavTabsComponent } from './nav-tabs.component';
import { WorkflowListPagerComponent } from './list-pager.component';
import { WorkflowItemPagerComponent } from './item-pager.component';
import { WorkflowReviewContainerComponent } from './review-container.component';
import { WorkflowReviewListComponent } from './review-list.component';
import { WorkflowReviewItemComponent } from './review-item.component';
import { WorkflowFormItemComponent } from './form-item.component';

import { AuthService } from '../auth/auth.service';
import { ApiUrl } from '../rest';
import { ListOption } from './list-group.model';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';



export function userIdApiUrlFactory(auth: AuthService, url: string) {
    return new ApiUrl(url, { userId: auth.userInfo.id });
}

export function apiServiceFactory(service: { api: ApiUrl }) {
    return service.api;
}

export function buildWorkflowRoutings(listType: Type<any>, itemType: Type<any>,
    containerResolve?: ResolveData): Routes {
    return [{
        path: '',
        component: WorkflowReviewContainerComponent,
        resolve: containerResolve ? { config: containerResolve} : null,
        children: [{
            path: '', redirectTo: 'todo', pathMatch: 'full'
        }, {
            path: ':type',
            children: [{
                path: '',
                component: listType,
                resolve: { list: WorkflowListResolve },
                runGuardsAndResolvers: 'always',
            }, {
                path: ':id',
                component: itemType,
                resolve: { item: WorkflowItemResolve },
            }],
        }],
    }];
}

export {
    NextOptions,
    ReviewOptions,
    RevokeOptions,
    SubmitOptions,
    Workflow,
    WorkflowItemResolve,
    WorkflowListResolve,
};

export * from './list-group.model';
export * from './review-list.model';

export const WORKFLOW_CONTAINTER_QUERYABLE = new InjectionToken('WORKFLOW_CONTAINTER_QUERYABLE');

const WORKFLOW_DIALOGS: any[] = [
    WorkflowSubmitDialog,
    WorkflowAcceptDialog,
    WorkflowNextDialog,
    WorkflowRollbackDialog,
    WorkflowRejectDialog,
    WorkflowRevokeDialog,
    WorkflowWorkitemsDialog,
    WorkflowReviewDialog,
];

const WORKFLOW_BUTTONS: any[] = [
    WorkflowAcceptButtonDirective,
    WorkflowNextButtonDirective,
    WorkflowRollbackButtonDirective,
    WorkflowRejectButtonDirective,
    WorkflowSubmitButtonDirective,
    WorkflowRevokeButtonDirective,
    WorkflowWorkitemsButtonDirective,
];

const WORKFLOW_COMPONENTS: any[] = [
    WorkitemStatusTextPipe,
    WorkitemStatusComponent,
    WorkflowListGroupComponent,
    WorkflowNavTabsComponent,
    WorkflowListPagerComponent,
    WorkflowItemPagerComponent,
    WorkflowReviewContainerComponent,
    WorkflowReviewListComponent,
    WorkflowReviewItemComponent,
    WorkflowFormItemComponent,
    WorkflowReviewButtonDirective,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        FontAwesomeModule,
    ],
    declarations: [
        WORKFLOW_DIALOGS,
        WORKFLOW_BUTTONS,
        WORKFLOW_COMPONENTS
    ],
    providers: [
        Dialog,
        Workflow,
        WorkflowItemResolve,
        WorkflowListResolve,
    ],
    exports: [
        WORKFLOW_BUTTONS,
        WORKFLOW_COMPONENTS
    ],
    entryComponents: [
        WORKFLOW_DIALOGS,
    ],
})
export class WorkflowModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faChevronLeft, faChevronRight, faSearch);
    }

    static forReview(apiUrl: string, listOptions: ListOption[]): ModuleWithProviders<WorkflowModule> {
        return {
            ngModule: WorkflowModule,
            providers: [{
                provide: '__WORKFLOW_API_URL_INTERNAL__',
                useValue: apiUrl,
            }, {
                provide: 'WORKFLOW_API_URL',
                useFactory: userIdApiUrlFactory,
                deps: [
                    AuthService,
                    '__WORKFLOW_API_URL_INTERNAL__'
                ],
            }, {
                provide: 'WORKFLOW_LIST_OPTIONS',
                useValue: listOptions,
            }],
        };
    }

    static forSubmit<T extends { api: ApiUrl }>(type: Type<T>): ModuleWithProviders<WorkflowModule> {
        return {
            ngModule: WorkflowModule,
            providers: [{
                provide: 'WORKFLOW_ITEM_SERVICE',
                useExisting: type,
            }, {
                provide: 'WORKFLOW_API_URL',
                useFactory: apiServiceFactory,
                deps: [type],
            }],
        };
    }
}
