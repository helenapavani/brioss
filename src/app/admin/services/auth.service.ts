import jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private decodedToken: any
	constructor() { this.decodeToken() }

	get getCliente(): string {
		return this.decodedToken.cliente
	}
	get getEmailCliente(): string {
		return this.decodedToken.email
	}
	get getClientId(): string {
		return this.decodedToken.userId
	}

	isLoggedIn(): boolean {
		const token = localStorage.getItem('token');
		this.decodeToken()
		return !!token;
	}

	logout() {
		localStorage.removeItem('token');
	}

	decodeToken() {
		try {
			const token = localStorage.getItem('token') as string;

			if (token) {
				this.decodedToken = jwtDecode(token);
			}

		} catch (error) {

			console.error('Erro ao decodificar o token JWT:');
		}
	}

	get getUserId() {
		return this.decodedToken.userId
	}

	isUserAdmin() {
		return true;
	}

}



