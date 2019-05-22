import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';

import { FundRoutingModule } from './fund-routing.module';
import { FundService } from './fund.service';
import { FundListComponent } from './fund-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        FundRoutingModule,
    ],
    declarations: [
        FundListComponent,
    ],
    providers: [
        FundService,
        { provide: 'FUND_API_URL', useValue: '/api/hunt/funds' },
    ],
})
export class FundModule {}
