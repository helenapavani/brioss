import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() { }
	getToken(): string | null {
		return localStorage.getItem('token');
	}

	getUserName(): string | null {
		const token = this.getToken();
		if (token) {
			const decodedToken: { sub: string } = jwt_decode(token);
			return decodedToken.sub;
		}
		return null;
	}


}
