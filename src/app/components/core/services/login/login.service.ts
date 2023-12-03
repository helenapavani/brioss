import { environment } from './../../../../environment/environment-test';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../interfaces/LoginRequest';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private readonly API_URL = `${environment.API_URL}`

	constructor(private http: HttpClient) { }

	login(dados: LoginRequest): Observable<TokenReponse> {
		return this.http.post<TokenReponse>(`${this.API_URL}/login`, dados);
	}
}

interface TokenReponse {
	token: string;
}
