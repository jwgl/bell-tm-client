import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../shared/common-pipes';

import { TaskListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        TaskListComponent,
    ],
    exports: [
        TaskListComponent,
    ],
})
export class TaskFormListModule { }
