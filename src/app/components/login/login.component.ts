import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoginService } from './../core/services/login/login.service';
import { Component, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuarioService } from '../core/services/usuario/usuario.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
	private readonly subscriptions = new Subscription();
	registered: boolean = false;
	email: string = '';
	senha: string = '';

	constructor(
		private loginService: LoginService,
		private readonly router: Router,
		private usuarioService: UsuarioService
	) { }

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
	verificarLogin() {
		const crendenciais = {
			email: this.email,
			senha: this.senha
		}

		const subscription = this.loginService
			.login(crendenciais)
			.subscribe(res => {
				localStorage.setItem('token', res.token)
				this.usuarioService.setIsLogado$(true)
				this.router.navigate(['/'])
			})

		// this.usuarioService.getUsuatio().subscribe()
		this.subscriptions.add(subscription);
	}
}
