import { Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BaseTable } from './baseTable';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-asset-place-table',
    styleUrls: ['filter-group.scss'],
    templateUrl: 'place-table.component.html',
})
export class PlaceTableComponent extends BaseTable implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
    @ViewChild('labelTmpl', { static: true }) labelTmpl: TemplateRef<any>;
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
            { prop: 'building', name: '教学楼', width: 90 },
            { prop: 'groups', name: '一级分类', comparator: this.localComparator, width: 90 },
            { prop: 'roomType', name: '二级分类', comparator: this.localComparator, width: 90 },
            { prop: 'name', name: '房间号', width: 60 },
            { prop: 'purpose', name: '功能', width: 90 },
            { prop: 'measure', name: '面积', width: 60 },
            { prop: 'seat', name: '座位数', width: 60 },
            { prop: 'seatType', name: '桌椅类型', comparator: this.localComparator },
            { prop: 'department', name: '使用单位', comparator: this.localComparator, width: 90 },
            { prop: 'statusLabel', name: '状态', comparator: this.localComparator, width: 90 },
            { prop: 'labels', name: '标签', comparator: this.localComparator, cellTemplate: this.labelTmpl, width: 480 },
            { prop: 'note', name: '备注', width: 120 },
        ];
    }

    @Input() set detailShow(value: boolean) {
        if (value) {
            let prop = this.columns.find(th => th.prop === 'id');
            if (prop) {
                prop['cellTemplate'] = this.idTmpl;
            }
            prop = this.columns.find(th => th.prop === 'labels');
            if (prop) {
                prop['cellTemplate'] = this.labelTmpl;
            }
        }
    }

    @Input() set data(value: any[]) {
        if (value) {
            const filterColumns = [
                { name: 'building', label: '教学楼' },
                { name: 'groups', label: '一级分类' },
                { name: 'roomType', label: '二级分类' },
                { name: 'name', label: '房间号' },
                { name: 'purpose', label: '功能' },
                { name: 'seatType', label: '桌椅类型' },
                { name: 'department', label: '使用单位' },
                { name: 'statusLabel', label: '状态' }
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

    log(value: any): string {
        console.log(value);
        return 'log';
    }
}
