import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LevelPipe } from './pipes/level-pipe';
import { ReviewTypePipe } from './pipes/type-pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LevelPipe,
        ReviewTypePipe,
    ],
    exports: [
        LevelPipe,
        ReviewTypePipe,
    ],
})
export class PipesModule {}
