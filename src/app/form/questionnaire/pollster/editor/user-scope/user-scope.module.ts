import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireSharedModule } from '../../../shared/questionnaire-shared.module';
import { UserScopeEditorComponent } from './user-scope-editor.component';
import { UserScopeSelectDialog } from './user-scope-select.dialog';
import { UserScopeSelectDialogService } from './user-scope-select.service';
import { UserScopeService } from './user-scope.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        UserScopeEditorComponent,
        UserScopeSelectDialog,
    ],
    exports: [
        UserScopeEditorComponent,
    ],
    entryComponents: [
        UserScopeSelectDialog,
    ],
    providers: [
        UserScopeSelectDialogService,
        UserScopeService,
    ]
})
export class QuestionnaireUserScopeModule { }
