import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component'

import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    TextInputComponent,
    DatePickerComponent,
    MemberMessagesComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: errorInterceptor,multi:true},
    // {provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
