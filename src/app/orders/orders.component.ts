import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdersService } from './orders.service';
import { Order } from './orders.model';
import { DatePipe } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'orders',
  templateUrl: 'orders.component.html'
})

export class OrdersComponent  { 
	orders: any[] = [];
	clientId: number;
	sub: any;
	noOrders: boolean = false;
	currentOrder: Order;
	currentOrderIndex: number;
	addNewOrderForm: FormGroup;
	openEditModal: boolean = false;

	constructor(
		private _router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private _ordersService: OrdersService
	) {
		this.addNewOrderForm = this.fb.group({
			'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'price': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'date': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
		});
	}

	getAllOrders(){
		let savedOrders = this._ordersService.getOrdersFromLS(this.clientId);
		if(savedOrders.length){
			this.orders = savedOrders;
		} else {
			this.noOrders = true;
		}
	}

	addOrder(){
		let newOrder = this.addNewOrderForm.value;
		newOrder.clientId = this.clientId;
		this.orders.push(newOrder);
		this.noOrders = false;
		this._ordersService.addToLS(newOrder);
	}

	editOrder(index){
		this.currentOrder = this.orders[index];
		this.currentOrderIndex = index;
		this.openEditModal = true;
	}

	refreshOrder(ev){
		if(ev){
			this.orders[this.currentOrderIndex].name = ev.name;
			this.orders[this.currentOrderIndex].price = ev.price;
			this.orders[this.currentOrderIndex].date = ev.date;
			this._ordersService.updateLS(this.orders[this.currentOrderIndex]);
		}
		this.openEditModal = false;
	}

	removeOrder(index){
		this._ordersService.removeFromLS(this.orders[index]);
		this.orders.splice(index, 1);
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
		    this.clientId = parseInt(params['id']);
		});
		this.getAllOrders();
	}

}