import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { UpdateTaskComponent } from './UI/update-task/update-task.component';
import { SharedService } from './Services/shared.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { AddUsersComponent } from './UI/add-users/add-users.component';
import { AddProjectsComponent } from './UI/add-projects/add-projects.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    AddUsersComponent,
    AddProjectsComponent
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [SharedService, HttpClientModule,HttpClient,DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
