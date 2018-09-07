import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CommonDirectivesModule} from 'core/common-directives';

import {ApplicationSharedModule} from '../shared/application-shared.module';
import {BatchRoutingModule} from './finder-routing.module';
import {FinderService} from './finder.service';
import {FinderItemComponent} from './item.component';
import {FinderListComponent} from './list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        BatchRoutingModule,
        ApplicationSharedModule,
    ],
    declarations: [
        FinderListComponent,
        FinderItemComponent,
    ],
    providers: [
        FinderService,
        { provide: 'FINDER_API_URL', useValue: '/api/dualdegree/finders' },
    ],
})
class FinderModule {}
