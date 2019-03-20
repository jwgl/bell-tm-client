import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tm-select-or-other',
    styleUrls: ['common.shared.scss'],
    templateUrl: 'select-or-other.component.html',
})
export class SelectOrOtherComponent {
    @Input() options: any[];
    @Input() defaultValue: string;
    @Input() disabled: boolean;
    @Output() selectObject: EventEmitter<any> = new EventEmitter<any>();
    selectedValue: any;
    value = '';

    objectSelected(item: any) {
        this.selectedValue = item.value;
        this.selectObject.emit(item);
    }

    other() {
        this.selectedValue = -1;
        this.selectObject.emit({name: this.value, value: -1});
    }
}
