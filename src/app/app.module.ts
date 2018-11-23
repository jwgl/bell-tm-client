import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { RestModule } from 'core/rest';
import { Dialog } from 'core/dialogs';
import { ComponentReuseStrategy } from 'core/route/component.reuse';

import { AppRoutingModule } from './app.routing';
import { WorkbenchModule } from './workbench/workbench.module';
import { AppComponent } from './app.component';

import { AuthModule } from 'core/auth';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faLock, faUser);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        WorkbenchModule,
        LoginModule,
        AuthModule,
        RestModule.forRoot([]),
    ],
    providers: [
        Dialog,
        AppService,
        { provide: RouteReuseStrategy, useClass: ComponentReuseStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
