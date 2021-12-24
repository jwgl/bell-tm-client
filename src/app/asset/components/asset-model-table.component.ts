import { Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BaseTable } from './baseTable';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-asset-model-table',
    styleUrls: ['filter-group.scss'],
    templateUrl: 'asset-model-table.component.html',
})
export class AssetModelTableComponent extends BaseTable implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
    @Output() checkedList = new EventEmitter<any>();

    @Input() set checkAble(value: boolean) {
        if (value) {
            this.columns = [{ draggable: false, sortable: false, headerCheckboxable: true, width: 30, checkboxable: true }]
                .concat(this.columns);
        }
    }

    constructor() {
        super();
        this.columns = [
            { draggable: false, name: 'ID', prop: 'id', cellTemplate: this.idTmpl, width: 80 },
            { prop: 'name', name: '设备名称', comparator: this.localComparator, width: 90 },
            { prop: 'brand', name: '品牌', comparator: this.localComparator, width: 90 },
            { prop: 'specs', name: '规格型号', width: 200 },
            { prop: 'parameter', name: '参数', width: 200 },
        ];
    }

    @Input() set data(value: any[]) {
        if (value) {
            const filterColumns = [
                { name: 'name', label: '设备名称' },
                { name: 'brand', label: '品牌' },
                { name: 'specs', label: '规格型号' },
                { name: 'state', label: '状态' }
            ];
            this.setData(value, filterColumns);
        }
    }

    ngAfterViewInit() {
        if (this.dropdown) {
          $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
          });
        }
        if (this.input) {
          typeahead(this.input).pipe(
            switchMap(value => this.searchStr = value)
          ).subscribe(value => value);
        }
      }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        selected.forEach(t => t.checked = true);
        this.selected.push(...selected);
        this.checkedList.emit(this.selected);
    }
}
