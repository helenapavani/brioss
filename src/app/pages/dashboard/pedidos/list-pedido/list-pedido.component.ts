import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Pedidos } from '../pedidos.component';
import { PedidoService } from 'src/app/components/core/services/pedido/pedido.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-list-pedido',
	templateUrl: './list-pedido.component.html',
	styleUrls: ['./list-pedido.component.scss']
})
export class ListPedidoComponent implements OnInit, OnDestroy {
	@Input() pedido!: Pedidos;
	itens: string[] = []
	constructor(private _pedidoService: PedidoService) { }
	ngOnDestroy(): void {
		this.sub$.unsubscribe()
	}
	private readonly sub$ = new Subscription();

	ngOnInit() {
		console.log(this.pedido)
		this.getInfos()
		this.verificarStatus()

	}

	getInfos() {
		this.pedido?.itens.forEach(item => {
			this.itens.push(`${item.quantidade}x${item.produto.nomeProduto}`)
		})
	}

	verificarStatus() {
		if (this.naoEstaConcluido()) {
			this.atualizarStatusPedido()
		}
	}

	private naoEstaConcluido() {
		return this.pedido.statusPedido !== "Entregue" && this.pedido.concluido;
	}

	atualizarStatusPedido() {
		const sub = this._pedidoService
			.updateStatusPedido(this.pedido.id)
			.subscribe(data => this.pedido = data)

		this.sub$.add(sub);
	}

}
