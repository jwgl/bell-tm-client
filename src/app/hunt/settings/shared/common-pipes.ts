import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConclusionPipe } from './pipes/conclusion-pipe';
import { LevelPipe } from './pipes/level-pipe';
import { ReviewTypePipe } from './pipes/type-pipe';
import { ChangeTypePipe } from './pipes/change-type-pipe';
import { ProjectStatusPipe } from './pipes/project-status-pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LevelPipe,
        ReviewTypePipe,
        ConclusionPipe,
        ProjectStatusPipe,
        ChangeTypePipe,
    ],
    exports: [
        LevelPipe,
        ReviewTypePipe,
        ConclusionPipe,
        ProjectStatusPipe,
        ChangeTypePipe,
    ],
})
export class PipesModule { }
