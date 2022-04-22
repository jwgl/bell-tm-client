import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-select-or-other',
    styleUrls: ['shared.scss'],
    templateUrl: 'select-or-other.component.html',
})
export class SelectOrOtherComponent implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @Input() options: any[];
    @Input() defaultValue: string;
    @Input() disabled: boolean;
    @Output() selectObject: EventEmitter<any> = new EventEmitter<any>();
    selectedValue: any;
    value = '';
    searchStr: string;
    list: any[];
    listTemp: any[];

    ngAfterViewInit() {
        if (this.input) {
          typeahead(this.input).pipe(
            switchMap(value => this.searchStr = value)
          ).subscribe(value => value);
        }
      }

    objectSelected(item: any) {
        this.selectedValue = item.value;
        this.selectObject.emit(item);
    }

    other() {
        this.selectedValue = -1;
        this.selectObject.emit({name: this.value, value: -1});
    }
    onValueChanged() {
        this.selectObject.emit({name: this.value, value: -1});
    }

    filterByKey() {
        return (item: any) => {
            return !this.searchStr || !item || item.name.indexOf(this.searchStr) >= 0;
        };
    }

    sort(list: any[]) {
        return list.sort((a: string, b: string) => String(a).localeCompare(String(b)));
    }
}
