import { NgModule, Type, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Resolve, ResolveData } from '@angular/router';

import { CommonDirectivesModule } from '../common-directives';
import { Dialog } from '../dialogs';
import { WorkflowSubmitButtonDirective } from './submit.button';
import {
    NextOptions,
    ReviewOptions,
    RevokeOptions,
    SubmitOptions,
    Workflow,
} from './workflow.service';

import { WorkflowItemResolve } from './item.resolve';
import { WorkflowListResolve } from './list.resolve';

import { WorkflowListGroupComponent } from './list-group.component';
import { WorkflowNavTabsComponent } from './nav-tabs.component';
import { WorkflowListPagerComponent } from './list-pager.component';
import { WorkflowReviewContainerComponent } from './review-container.component';
import { WorkflowReviewListComponent } from './review-list.component';
import { WorkflowReviewItemComponent } from './review-item.component';
import { WorkflowFormItemComponent } from './form-item.component';

import { AuthService } from '../auth/auth.service';
import { ApiUrl } from '../rest';

import {
    WorkflowStatusTextPipe,
    WorkflowStatusClassPipe,
    UserTaskStatusClassPipe,
} from './workflow-status.pipe';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { WorkflowStatusComponent } from './workflow-status.component';
import { WorkflowTaskListComponent } from './task-list.component';
import { WorkflowResultTextPipe } from './workflow-result.pipe';

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


export const WORKFLOW_CONTAINTER_QUERYABLE = new InjectionToken('WORKFLOW_CONTAINTER_QUERYABLE');

const WORKFLOW_DIALOGS: any[] = [
];

const WORKFLOW_BUTTONS: any[] = [
    WorkflowSubmitButtonDirective,
];

const WORKFLOW_COMPONENTS: any[] = [
    WorkflowStatusComponent,
    WorkflowStatusTextPipe,
    WorkflowStatusClassPipe,
    UserTaskStatusClassPipe,
    WorkflowListGroupComponent,
    WorkflowNavTabsComponent,
    WorkflowListPagerComponent,
    WorkflowReviewContainerComponent,
    WorkflowReviewListComponent,
    WorkflowReviewItemComponent,
    WorkflowFormItemComponent,
    WorkflowTaskListComponent,
    WorkflowResultTextPipe,
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
        WORKFLOW_COMPONENTS,
    ],
    providers: [
        Dialog,
        Workflow,
        WorkflowItemResolve,
        WorkflowListResolve,
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
    constructor(library: FaIconLibrary) {
        library.addIcons(faChevronLeft, faChevronRight, faSearch);
    }

    static forReview(apiUrl: string): ModuleWithProviders<Workflow2Module> {
        return {
            ngModule: Workflow2Module,
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
            }],
        };
    }

    static forSubmit<T extends { api: ApiUrl }>(type: Type<T>): ModuleWithProviders<Workflow2Module> {
        return {
            ngModule: Workflow2Module,
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
