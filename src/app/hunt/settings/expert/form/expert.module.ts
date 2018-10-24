import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertFormService } from './form.service';
import { ExpertRoutingModule } from './expert-routing.module';
import { ExpertListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        ExpertRoutingModule,
        ExpertListModule,
    ],
    providers: [
        ExpertFormService,
        { provide: 'EXPERTS_API_URL', useValue: '/api/hunt/settings/experts' },
        { provide: 'TEAM_API_URL', useValue: '/api/hunt/settings/teams' },
    ],
})
export class ExpertFormModule { }
