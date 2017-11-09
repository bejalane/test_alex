import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from './clients.service';
import { Client } from './client.model'

@Component({
  moduleId: module.id,
  selector: 'clients',
  templateUrl: 'clients.component.html'
})

export class ClientsComponent  { 
	clients: any[];
	currentClient: Client;
	currentClientIndex: number;
	addNewClientForm: FormGroup;
	openEditModal: boolean = false;

	constructor(
		private _router: Router,
		private fb: FormBuilder,
		private _clientsService: ClientsService
	) {
		this.addNewClientForm = this.fb.group({
			'firstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'lastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'email': ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
			'country': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'city': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
		});
	}

	getAllClients(){
		let savedClients = this._clientsService.getClientsFromLS();
		if(savedClients && (savedClients.length !== 0)){
			this.clients = savedClients;
		} else {
			this._clientsService.getClients()
			.subscribe(
				data =>{ 
					this.clients = data.clients;
					this.updateLS();
				},
				errorData => { 
					console.log(errorData); 
					this.clients = [];
					this.updateLS();
				}
			);
		}
	}

	updateLS(){
		this._clientsService.updateLocalStorage(this.clients);
	}

	addClient(){
		let newClient = this.addNewClientForm.value;
		//it is just for elementary avoiding of id duplication, of course in real life id is coming from db
		newClient.id = (this.clients.length) ? this.clients[this.clients.length - 1].id + 1 : 1;
		this.clients.push(newClient);
		this.updateLS();
	}

	editClient(index){
		this.currentClient = this.clients[index];
		this.currentClientIndex = index;
		this.openEditModal = true;
	}

	refreshClient(ev){
		if(ev){
			this.clients[this.currentClientIndex] = ev;
			this.updateLS();
		}
		this.openEditModal = false;
	}

	removeClient(index){
		this.clients.splice(index, 1);
		this.updateLS();
	}

	gotoOrders(index){
		this._router.navigate(['/orders/' + this.clients[index].id]);
	}

	ngOnInit() {
		this.getAllClients();
	}

}