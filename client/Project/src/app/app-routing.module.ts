import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApeluriComponent } from './apeluri/apeluri.component';
import { ServiciiComponent } from './servicii/servicii.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'apeluri', component: ApeluriComponent },
  { path: 'servicii', component: ServiciiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
