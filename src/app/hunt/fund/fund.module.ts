import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { FundImportDialog } from './editor/form-editor.component';
import { FundRoutingModule } from './fund-routing.module';
import { FundService } from './fund.service';
import { FundListComponent } from './fund-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        FormsModule,
        NgxUploaderModule,
        FundRoutingModule,
    ],
    declarations: [
        FundListComponent,
        FundImportDialog,
    ],
    providers: [
        FundService,
        Dialog,
        { provide: 'FUND_API_URL', useValue: '/api/hunt/approvers/${userId}/funds' },
    ],
    entryComponents: [
        FundImportDialog,
    ],
})
export class FundModule {}
