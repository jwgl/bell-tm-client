import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../../settings/shared/common-pipes';
import { ProjectSelectComponent } from './project-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        ProjectSelectComponent,
    ],
    exports: [
        ProjectSelectComponent,
    ],
})
export class ProjectSelectModule { }
