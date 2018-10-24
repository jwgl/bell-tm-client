import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';

import { CheckerRoutingModule } from './checker-routing.module';
import { CheckerFormService } from './form.service';
import { TaskFormListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CheckerRoutingModule,
        TaskFormListModule,
    ],
    providers: [
        Dialog,
        CheckerFormService,
        { provide: 'CHECKER_API_URL', useValue: '/api/hunt/settings/checkers' },
    ],
})
export class CheckerFormModule {}
