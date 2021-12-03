import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApeluriComponent } from './apeluri/apeluri.component';
import { ServiciiComponent } from './servicii/servicii.component';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    AppComponent,
    ApeluriComponent,
    ServiciiComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
