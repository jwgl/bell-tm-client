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
import { TableIcon } from './table.component';
import { ListIcon } from './list.component';
import { Grid3x3GapIcon } from './grid-3x3-gap.component';
import { GearIcon } from './gear.component';
import { PlusIcon } from './plus.component';
import { TagIcon } from './tag.component';
import { HashIcon } from './hash.component';
import { ArrowUpIcon } from './arrow-up.component';
import { ArrowDownIcon } from './arrow-down.component';
import { TrashIcon } from './trash.component';

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
    TableIcon,
    ListIcon,
    Grid3x3GapIcon,
    GearIcon,
    PlusIcon,
    TagIcon,
    HashIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    TrashIcon,
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
