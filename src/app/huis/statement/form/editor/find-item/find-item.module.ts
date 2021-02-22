import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { FindItemDialog } from './find-item.dialog';
import { FindItemDialogService } from './find-item.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FindItemDialog,
    ],
    providers: [
        FindItemDialogService,
    ],
    entryComponents: [
        FindItemDialog,
    ],
})
export class StatementFindItemModule { }
