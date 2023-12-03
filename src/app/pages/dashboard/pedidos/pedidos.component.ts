import { Product } from './../../../components/carrinho-compras/Product';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PedidoService } from 'src/app/components/core/services/pedido/pedido.service';


import {
	CdkDrag,
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: 'app-pedidos',
	templateUrl: './pedidos.component.html',
	styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, OnDestroy {

	@ViewChild(MatTable) table!: MatTable<PeriodicElement>;
	todosPedidos: Pedidos[] = []
	todosPedidosConcluidos: Pedidos[] = []
	done: Pedidos[] = [];
	isLoading = false
	private readonly sub$ = new Subscription();

	constructor(
		private _pedidoService: PedidoService
	) { }

	ngOnDestroy(): void {
		this.sub$.unsubscribe();
	}

	ngOnInit(): void {
		this.isLoading = true;
		this.getAllPedidos();
	}


	private getAllPedidos() {
		const sub = this._pedidoService.getAllPedidos()
			.subscribe(data => {
				this.todosPedidos = data.filter(pedido => pedido.statusPedido !== "Entregue");
				console.log("🚀 ~todosPedidos:", this.todosPedidos)
				this.done = data.filter(pedido => pedido.statusPedido === "Entregue");

				this.isLoading = false;
			});

		this.sub$.add(sub);
	}

	drop(event: CdkDragDrop<Pedidos[]>) {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}

		const itemMoved = event.container.data[event.currentIndex];
		if (!itemMoved.concluido)
			itemMoved.concluido = true;
		else {
			itemMoved.concluido = false;
		}
	}

	noReturnPredicate() {
		return false;
	}

}


export interface Pedidos {
	id: number;
	quantidade: number;
	precoUnitario: number;
	subtotal: number;
	pedidoId: number;
	produtoId: number;
	concluido?: boolean
	produto: Product[];
}



export interface Pedidos {
	id: number;
	dataPedido: Date;
	statusPedido: string;
	clienteId: number;
	total: number;
	observacao: string;
	modoEntrega: null;
	itens: Iten[];
	conteudo: string[];
}

export interface Iten {
	id: number;
	quantidade: number;
	precoUnitario: number;
	subtotal: number;
	pedidoId: number;
	produtoId: number;
	produto: Produto;
}

export interface Produto {
	id: number;
	nomeProduto: string;
	descricao: string;
	preco: number;
	estoqueDisponivel: number;
	status: null;
	imageUrl: null;
	categoria: null;
	ativo: null;
	isDestaque: null;
}
