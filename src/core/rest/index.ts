import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';

import { Http } from './http';
import { ApiUrl } from './api-url';
import { ReloginInterceptor } from './relogin.interceptor';
import { RestEditService } from './rest-edit-service';
import { RestShowService } from './rest-show-service';

export {
    Http,
    ApiUrl,
    RestEditService,
    RestShowService,
};

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientXsrfModule,
    ],
    providers: [
        Http,
    ],
})
export class RestModule {
    static forRoot(providers: Provider[]): ModuleWithProviders {
        return {
            ngModule: RestModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ReloginInterceptor,
                    multi: true,
                },
                ...providers,
            ],
        };
    }
}
