import { Component, Inject, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { ApplicationForm } from '../form.model';
import { Http, ApiUrl } from 'core/rest';

@Component({
    selector: 'tm-application-form-overlay',
    templateUrl: 'form-overlay.component.html',
})
export class ApplicationFormOverlayComponent {
    @ViewChild('viewerTpl', { static: true })
    viewerTemplate: TemplateRef<any>;

    applicationApi: ApiUrl;
    form: ApplicationForm;
    fileNames: string[];
    paperForm: any;

    constructor(
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private positionBuilder: OverlayPositionBuilder,
        private http: Http,
        @Inject('APPLICATION_API_URL')
        applicationApiUrl: string,
    ) {
        this.applicationApi = new ApiUrl(applicationApiUrl);
    }

    show(formId: number) {
        this.http.get<any>(this.applicationApi.item(formId)).subscribe(dto => {
            this.form = new ApplicationForm(dto.form);
            this.fileNames = dto.fileNames;
            this.paperForm = dto.paperForm;

            const overlayRef = this.overlay.create({
                positionStrategy: this.positionBuilder.global().top('0').right('0'),
                width: '750px',
                height: '100%',
                hasBackdrop: true,
                panelClass: 'bg-white',
            });

            const close = () => {
                overlayRef.detach();
            };

            const viewerPortal = new TemplatePortal(this.viewerTemplate, this.viewContainerRef, {
                form: this.form,
                close: close,
            });
            overlayRef.attach(viewerPortal);
            overlayRef.backdropClick().subscribe(close);
        });
    }
}
