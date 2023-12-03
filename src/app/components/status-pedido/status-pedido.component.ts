import { Subscription } from 'rxjs';
import { PedidoService } from './../core/services/pedido/pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-status-pedido',
	templateUrl: './status-pedido.component.html',
	styleUrls: ['./status-pedido.component.scss']
})
export class StatusPedidoComponent implements OnInit {
	pedido!: any
	progressoPorcentagem = 50
	private readonly sub$ = new Subscription()


	constructor(private pedidoService: PedidoService) { }
	ngOnInit(): void {

		const sub = this.pedidoService.getPedidoByClienteId()
			.subscribe(res => {
				this.pedido = res[0]
				const status = this.pedido.statusPedido

				if (status === "Em andamento") {
					this.progressoPorcentagem = 50
				} else if (status === "Entregue") {
					this.progressoPorcentagem = 100
				}
			})

		this.sub$.add()

	}

	obterHorarioAtual() {
		const agora = new Date();

		const horas = agora.getHours().toString().padStart(2, '0');
		const minutos = agora.getMinutes().toString().padStart(2, '0');

		const horarioAtual = `${horas}:${minutos}`;

		return horarioAtual;
	}

}
