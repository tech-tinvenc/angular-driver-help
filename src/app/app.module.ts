import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './_services/messaging.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { ViewRequestsComponent } from './view-request';
import {NotificationsComponent } from './notifications';
export const firebase = require("firebase/app");


export const environment = {
production: false,
firebase: {
    apiKey: "AIzaSyBTPDBCsa-ivO6U_HFvCJNRS3-yZqlv1uI",
    authDomain: "driver-help-ec77d.firebaseapp.com",
    databaseURL: "https://driver-help-ec77d.firebaseio.com",
    projectId: "driver-help-ec77d",
    storageBucket: "driver-help-ec77d.appspot.com",
    messagingSenderId: "800408515429",
    appId: "1:800408515429:web:b8b3abef8276f5e1b9278c",
    measurementId: "G-1WKT05TKCW"
  }
};

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFireMessagingModule,
		AngularFireModule.initializeApp(environment.firebase)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        ViewRequestsComponent,
        NotificationsComponent
    ],
    providers: [
		MessagingService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
