import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { UserScopeTextPipe } from './user-scope.pipe';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        CommonDirectivesModule,
    ],
    declarations: [
        QuestionnaireFormViewerComponent,
        UserScopeTextPipe,
    ],
    exports: [
        QuestionnaireFormViewerComponent,
        UserScopeTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
