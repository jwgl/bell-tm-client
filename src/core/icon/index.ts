import { NgModule } from '@angular/core';

import { UserIcon } from './user.component';
import { LockIcon } from './lock.component';
import { CopyIcon } from './copy.component';
import { ChevronUpIcon } from './chevron-up.component';
import { ChevronDownIcon } from './chevron-down.component';
import { ChevronLeftIcon } from './chevron-left.component';
import { ChevronRightIcon } from './chevron-right.component';
import { XSquareIcon } from './x-square.component';
import { SearchIcon } from './search.component';
const ICONS: any[] = [
    UserIcon,
    LockIcon,
    CopyIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XSquareIcon,
    SearchIcon,
];

@NgModule({
    declarations: [
        ICONS,
    ],
    exports: [
        ICONS,
    ],
})
export class IconModule {}
