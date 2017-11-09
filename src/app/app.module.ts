import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { ClientsModule } from './clients/clients.module';
import { ClientsService } from './clients/clients.service';

import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './orders/orders.service';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    rootRouting,
    ClientsModule,
    OrdersModule
  ],
  providers: [
  	ClientsService,
  	OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
