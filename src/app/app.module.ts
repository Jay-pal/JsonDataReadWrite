import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AddDataComponent } from './add-data/add-data.component';
import { HomeComponent } from './home/home.component'
import { ReactiveFormsModule } from '@angular/forms';
import { EditDataComponent } from './edit-data/edit-data.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
    HomeComponent,
    EditDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
