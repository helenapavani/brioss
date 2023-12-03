import { UsuarioService } from './../../components/core/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	estaLogado = false
	cliente: string = ''

	constructor(private readonly authService: AuthService,
		private usuarioService: UsuarioService) { }

	ngOnInit(): void {
		const token = localStorage.getItem('token');
		this.estaLogado = !!token

		this.usuarioService.getIsLogado$().subscribe(logado => {
			if (logado) {
				this.estaLogado = logado
			}
		})

		if (this.estaLogado) {
			this.cliente = this.firstLetterUpper(this.authService.getCliente)
		}
	}


	private firstLetterUpper(str: string) {
		let firstName = this.authService.getCliente.split(" ")[0]
		firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
		return firstName
	}

	sair() {
		this.estaLogado = false
		this.authService.logout()
	}
}
