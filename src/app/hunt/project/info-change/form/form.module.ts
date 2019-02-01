import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { RoutingModule } from './form-routing.module';
import { ChangeFormService } from './form.service';
import { ChangeFormItemModule } from './item/item.module';
import { ProjectListModule } from './list/form-list.module';
import { ChangeFormEditorModule } from './editor/form-editor.module';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(ChangeFormService),
        ProjectListModule,
        RoutingModule,
        WorkflowModule,
        ChangeFormEditorModule,
        ChangeFormItemModule,
    ],
    providers: [
        ChangeFormService,
        { provide: 'CHANGE_API_URL', useValue: '/api/hunt/teachers/${userId}/infoChanges' },
    ],
})
export class InfoChageModule { }
