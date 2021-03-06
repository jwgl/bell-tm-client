import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../../../settings/shared/common-pipes';
import { ChangeListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        ChangeListComponent,
    ],
    exports: [
        ChangeListComponent,
    ],
})
export class ProjectListModule { }
