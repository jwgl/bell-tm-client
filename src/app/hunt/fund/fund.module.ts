import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';

import { CommonDialogsModule } from 'core/common-dialogs';

import { FundRoutingModule } from './fund-routing.module';
import { FundService } from './fund.service';
import { FundListComponent } from './fund-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        FormsModule,
        NgxUploaderModule,
        FundRoutingModule,
    ],
    declarations: [
        FundListComponent,
    ],
    providers: [
        FundService,
        { provide: 'FUND_API_URL', useValue: '/api/hunt/approvers/${userId}/funds' },
    ],
})
export class FundModule {}
