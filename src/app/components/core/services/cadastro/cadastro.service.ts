import { environment } from './../../../../environment/environment-test';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CadastroService {
	private readonly API_URL = `${environment.API_URL}`;

	constructor(private http: HttpClient) { }

	cadastrar(payload: any): Observable<any> {
		return this.http.post(`${this.API_URL}/cadastro`, payload)
	}
}
