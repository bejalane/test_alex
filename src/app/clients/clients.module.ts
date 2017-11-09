import { ModuleWithProviders, NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ClientsComponent }  from './clients.component';
import { EditClientComponent }  from './editClient.component';

const clientsRoute: ModuleWithProviders = RouterModule.forChild ([
 { path: '', component: ClientsComponent}
]);

@NgModule({
  imports:      [ BrowserModule, clientsRoute, ReactiveFormsModule, FormsModule, HttpModule ],
  declarations: [ ClientsComponent, EditClientComponent ]
})
export class ClientsModule { }