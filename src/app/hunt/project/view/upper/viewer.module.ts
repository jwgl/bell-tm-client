import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './viewer-routing.module';
import { ProjectService } from './viewer.service';
import { ProjectListModule } from './list/project-list.module';
import { ProjectItemModule } from './item/project-item.module';
import { ProjectFormEditorModule } from './editor/form-editor.module';
import { FunViewModule } from '../../application/form/fund/fund-view.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectRoutingModule,
        ProjectListModule,
        ProjectItemModule,
        ProjectFormEditorModule,
        FunViewModule,
    ],
    providers: [
        ProjectService,
        { provide: 'PROJECT_API_URL', useValue: '/api/hunt/projects' },
    ],
})
export class ProjectModule { }
