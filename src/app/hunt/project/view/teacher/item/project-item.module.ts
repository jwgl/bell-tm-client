import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectFormViewerModule } from '../../../application/form/shared/form-viewer.module';
import { ProjectTeacherItemComponent } from './project-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ProjectFormViewerModule,
    ],
    declarations: [
        ProjectTeacherItemComponent,
    ],
    exports: [
        ProjectTeacherItemComponent,
    ],
})
export class ProjectTeacherItemModule { }
