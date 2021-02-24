import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tm-remove-item',
    styleUrls: ['remove-item.scss'],
    templateUrl: 'remove-item.html',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RemoveItemComponent { }
