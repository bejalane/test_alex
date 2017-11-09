import { ModuleWithProviders, NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { OrdersComponent }  from './orders.component';
import { EditOrderComponent }  from './editOrder.component';

const ordersRoute: ModuleWithProviders = RouterModule.forChild ([
 { path: 'orders/:id', component: OrdersComponent}
]);

@NgModule({
  imports:      [ BrowserModule, ordersRoute, ReactiveFormsModule, FormsModule, HttpModule ],
  declarations: [ OrdersComponent, EditOrderComponent ]
})
export class OrdersModule { }