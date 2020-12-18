import { Component, ElementRef, AfterViewInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Http } from 'core/rest';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-asset-model-select',
    styleUrls: ['shared.scss'],
    templateUrl: 'model-select.component.html',
})
export class ModelSelectComponent implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    @Output() selectModel: EventEmitter<any> = new EventEmitter<any>();

    models: any[];
    model: any = {};

    constructor(private http: Http) { }

    modelSelected(model: any) {
        this.selectModel.emit(model);
        this.model = model;
    }

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
        });
        typeahead(this.input).pipe(
            switchMap(value => this.findModel(value))
        ).subscribe(value => this.models = value);
    }

    get result(): string {
        if (!this.model || !this.model.name) {
            return '规格型号';
        } else {
            return `${this.model.name} ${this.model.brand} ${this.model.specs} ${this.model.parameter} `;
        }
    }

    clearSelected(): void {
        this.model.name = null;
        this.selectModel.emit(this.model);
    }

    findModel(value: string): Observable<any[]> {
        return this.http.get(`/api/asset/models?q=${encodeURIComponent(value)}`);
    }
}
