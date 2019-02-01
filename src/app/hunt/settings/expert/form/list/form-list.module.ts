import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ExpertListComponent } from './form-list.component';
import { TeamDialog } from './team.dialog';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ExpertListComponent,
        TeamDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        TeamDialog,
    ],
})
export class ExpertListModule {}
