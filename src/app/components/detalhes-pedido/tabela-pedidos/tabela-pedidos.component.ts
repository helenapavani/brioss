import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Product } from '../../carrinho-compras/Product';

@Component({
	selector: 'app-tabela-pedidos',
	templateUrl: './tabela-pedidos.component.html',
	styleUrls: ['./tabela-pedidos.component.scss']
})
export class TabelaPedidosComponent implements OnInit {
	@Input() pedidos: Product[] = []
	ELEMENT_DATA: any[] = [
		{ item: 1, nome: 't', descricao: "algo", valor: '00,00' },
		{ item: 2, nome: 'test', descricao: "algo", valor: '00,00' },
		{ item: 3, nome: 't', descricao: "algo", valor: '00,00' },
	];
	displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco'];
	dataSource = [...this.ELEMENT_DATA];

	@ViewChild(MatTable) table!: MatTable<any[]>;



	ngOnInit(): void {
		let id = 1

		// this.pedidos.forEach((el, index) => {
		// 	this.pedidos[index] = { ...this.pedidos[index], id: id++ }
		// });

		this.dataSource = [...this.pedidos]
		console.log(this.pedidos)
	}


}
