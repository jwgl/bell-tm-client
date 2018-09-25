import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { AgreementSharedModule } from '../../shared/agreement-shared.module';
import { AgreementItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        AgreementSharedModule,
    ],
    declarations: [
        AgreementItemComponent,
    ],
    exports: [
        AgreementItemComponent,
    ],
})
export class AgreementItemModule { }
