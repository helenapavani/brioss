import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environment/environment-test';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {


	private isLogado = new BehaviorSubject<boolean>(false);

	getIsLogado$() {
		return this.isLogado.asObservable()
	}
	setIsLogado$(value: boolean) {
		this.isLogado.next(value);
	}

	constructor(private htpp: HttpClient) { }
	getUsuario(email: string) {
		return this.htpp.post(`${environment.API_URL}/usuario`, { email: email })
	}



}
