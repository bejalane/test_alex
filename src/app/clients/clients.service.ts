import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {
	constructor(
		private _http: Http
	){}

	getClients() : Observable<any> {
		return this._http.get('http://www.mocky.io/v2/5a035061310000990e916a0d')
			.map((response:Response) => response.json())
			.catch((error:any) => Observable.throw(error.json()))
	}

	updateLocalStorage(clientsList){
		localStorage.setItem("clients", JSON.stringify(clientsList));
	}

	getClientsFromLS(){
		if(localStorage.getItem("clients")){
			return JSON.parse(localStorage.getItem("clients"));
		} else {
			return false;
		}
	}
}