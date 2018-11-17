import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { MisconductSharedModule } from '../../shared/misconduct-shared.module';
import { MisconductCheckItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        MisconductSharedModule,
    ],
    declarations: [
        MisconductCheckItemComponent,
    ],
    exports: [
        MisconductCheckItemComponent,
    ],
})
export class MisconductCheckItemModule { }
