import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'edit-order',
  templateUrl: 'editOrder.component.html'
})

export class EditOrderComponent  { 
	@Input() order: any;
	@Output() editedOrder = new EventEmitter();
	editOrderForm: FormGroup;

	constructor(
		private fb: FormBuilder
	) {
		this.editOrderForm = this.fb.group({
			'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
			'price': ['', Validators.compose([Validators.required])],
			'date': ['', Validators.compose([Validators.required])],
		});
	}
	setValues(){
		this.editOrderForm.setValue({
			'name': this.order.name,
			'price': this.order.price,
			'date': this.order.date
		})
	}

	saveOrder(){
		this.editedOrder.emit(this.editOrderForm.value);
	}

	closeModal(){
		this.editedOrder.emit(false);
	}

	ngOnInit() {
		this.setValues();
	}

}