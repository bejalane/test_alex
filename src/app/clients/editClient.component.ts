import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'edit-client',
  templateUrl: 'editClient.component.html'
})

export class EditClientComponent  { 
	@Input() client: any;
	@Output() editedClient = new EventEmitter();
	editClientForm: FormGroup;

	constructor(
		private fb: FormBuilder
	) {
		this.editClientForm = this.fb.group({
			'firstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'lastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'email': ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
			'country': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'city': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
		});
	}
	setValues(){
		this.editClientForm.setValue({
			'firstName': this.client.firstName,
			'lastName': this.client.lastName,
			'email': this.client.email,
			'country': this.client.country,
			'city': this.client.city
		})
	}

	saveClient(){
		let changedClient = this.editClientForm.value;
		changedClient.id = this.client.id;
		this.editedClient.emit(changedClient);
	}

	closeModal(){
		this.editedClient.emit(false);
	}

	ngOnInit() {
		this.setValues();
	}

}