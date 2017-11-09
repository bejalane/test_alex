import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {
	constructor(){}

	updateLocalStorage(orders){
		localStorage.setItem("orders", JSON.stringify(orders));
	}

	addToLS(order){
		let results = JSON.parse(localStorage.getItem("orders"));
		let ordersUpdate = (results) ? results : [];
		order.orderId = (ordersUpdate.length) ? results[results.length - 1].orderId + 1 : 1;
		ordersUpdate.push(order);
		localStorage.setItem("orders", JSON.stringify(ordersUpdate));
	}

	updateLS(order){
		console.log(order);
		let results = JSON.parse(localStorage.getItem("orders"));
		let index = results.map( (el) => el.orderId).indexOf(order.orderId);
		results[index] = order;
		localStorage.setItem("orders", JSON.stringify(results));
	}

	removeFromLS(order){
		let results = JSON.parse(localStorage.getItem("orders"));
		let index = results.map( (el) => el.orderId).indexOf(order.orderId);
		results.splice(index, 1);
		localStorage.setItem("orders", JSON.stringify(results));
	}

	getOrdersFromLS(id:number){
		if(localStorage.getItem("orders")){
			let results = JSON.parse(localStorage.getItem("orders"));
			results = results.filter(res => res.clientId === id);
			console.log(results);
			return results;
		} else {
			return false;
		}
	}
}