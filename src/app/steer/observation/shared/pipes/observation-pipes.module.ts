import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ObserverGroupPipe } from './observer-group';
import { TypeTextPipe } from './observer-type';
import { PagerPipe } from './pager';
import { StatusTextPipe } from './status';
import { TermTextPipe } from './term';
import { RecommendPipe } from './recommend';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ObserverGroupPipe,
        TypeTextPipe,
        PagerPipe,
        StatusTextPipe,
        TermTextPipe,
        RecommendPipe,
    ],
    exports: [
        ObserverGroupPipe,
        TypeTextPipe,
        PagerPipe,
        StatusTextPipe,
        TermTextPipe,
        RecommendPipe,
    ],
})
export class PipesModule {}
