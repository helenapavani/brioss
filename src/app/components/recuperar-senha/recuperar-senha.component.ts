import { Component } from '@angular/core';

@Component({
	selector: 'app-recuperar-senha',
	templateUrl: './recuperar-senha.component.html',
	styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {
	enviarCodigo: boolean = true;
	verificarEmail() {
		this.enviarCodigo = false
		return false
	}
}
