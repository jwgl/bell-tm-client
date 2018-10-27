import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { CreateOptionDialog } from './create-option.dialog';
import { CreateOptionDialogService } from './create-option.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        CreateOptionDialog,
    ],
    providers: [
        CreateOptionDialogService,
    ],
    entryComponents: [
        CreateOptionDialog,
    ],
})
export class CreateOptionModule { }
