import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../../../settings/shared/common-pipes';
import { TmGridModule } from '../../../../components/table.module';

import { ProjectListComponent } from './project-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
        TmGridModule,
    ],
    declarations: [
        ProjectListComponent,
    ],
    exports: [
        ProjectListComponent,
    ],
})
export class ApplicationAdministrationModule { }
