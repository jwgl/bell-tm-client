import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { RollcallFormRoutingModule } from './rollcall-editor.routing';
import { RollcallFormEditorComponent } from './rollcall-editor.component';
import { RollcallDetailViewComponent } from './detail-view.component';
import { RollcallListViewComponent } from './list-view.component';
import { RollcallLockViewComponent } from './lock-view.component';
import { RollcallSettingsDialog } from './rollcall-settings.dialog';
import { RollcallStatusComponent } from './rollcall-status.component';
import { RollcallSummaryComponent } from './rollcall-summary.component';
import { RollcallTileViewComponent } from './tile-view.component';
import { RollcallToggleBarComponent } from './toggle-bar.component';
import { FocusDirective } from './focus.directive';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IconModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        RollcallFormRoutingModule,
    ],
    declarations: [
        RollcallFormEditorComponent,
        RollcallDetailViewComponent,
        RollcallListViewComponent,
        RollcallTileViewComponent,
        RollcallLockViewComponent,
        RollcallToggleBarComponent,
        RollcallStatusComponent,
        RollcallSummaryComponent,
        RollcallSettingsDialog,
        FocusDirective,
    ],
    entryComponents: [
        RollcallSettingsDialog,
    ],
})
export class RoolcallFormEditorModule { }
