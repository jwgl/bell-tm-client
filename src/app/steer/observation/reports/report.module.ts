import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { DepartmentReportComponent } from './item/department.component';
import { ObservationReportComponent } from './item/observation-report.component';
import { RewardListComponent } from './item/reward.component';
import { TeacherSupervisedComponent } from './item/teacher-supervised.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReportRoutingModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        ReportComponent,
        DepartmentReportComponent,
        ObservationReportComponent,
        TeacherSupervisedComponent,
        RewardListComponent,
    ],
    providers: [
        ReportService,
        {provide: 'REPORT_API_URL', useValue: '/api/steer/reports'},
    ],
})
export class ReportModule { }
