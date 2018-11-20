import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConclusionPipe } from './pipes/conclusion-pipe';
import { LevelPipe } from './pipes/level-pipe';
import { ReviewTypePipe } from './pipes/type-pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LevelPipe,
        ReviewTypePipe,
        ConclusionPipe,
    ],
    exports: [
        LevelPipe,
        ReviewTypePipe,
        ConclusionPipe,
    ],
})
export class PipesModule {}
