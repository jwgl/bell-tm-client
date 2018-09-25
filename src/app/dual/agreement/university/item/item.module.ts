import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { UniversitySharedModule } from '../shared/university-shared.module';
import { UniversityItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        UniversitySharedModule,
    ],
    declarations: [
        UniversityItemComponent,
    ],
    exports: [
        UniversityItemComponent,
    ],
})
export class UniversityItemModule { }
