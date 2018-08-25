import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ProgramSettingRoutingModule } from './program-settings.routing';
import { ProgramSettingsComponent } from './program-settings.component';
import { ProgramEditorDialog } from './program-editor.dialog';
import { ProgramSettingsService } from './program-settings.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        ProgramSettingRoutingModule,
    ],
    declarations: [
        ProgramSettingsComponent,
        ProgramEditorDialog,
    ],
    entryComponents: [
        ProgramEditorDialog,
    ],
    providers: [
        Dialog,
        ProgramSettingsService,
        { provide: 'PROGRAM_SETTINGS_API_URL', useValue: '/api/plan/settings/programs' },
        { provide: 'SCHEME_TEMPLATES_API_URL', useValue: '/api/plan/schemeTemplates' },
    ]
})
export class ProgramSettingsModule { }
