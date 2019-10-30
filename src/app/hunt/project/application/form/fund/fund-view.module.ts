import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { FundViewComponent } from './fund-view.component';
import { FundViewService } from './fund-view.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FundViewComponent,
    ],
    providers: [
        FundViewService,
        { provide: 'FUND_API_URL', useValue: '/api/hunt/funds' },
    ],
    exports: [
        FundViewComponent,
    ],
})
export class FunViewModule { }
