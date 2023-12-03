import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../admin/services/auth.service';


@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor(private authService: AuthService) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.isUserAdmin()) {
			return true;
		} else {
			// Redirecione para uma página de erro, rota de login ou qualquer outra página adequada
			return false;
		}
	}
}
