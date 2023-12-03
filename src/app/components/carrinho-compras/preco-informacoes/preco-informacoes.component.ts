import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-preco-informacoes',
	templateUrl: './preco-informacoes.component.html',
	styleUrls: ['./preco-informacoes.component.scss']
})
export class PrecoInformacoesComponent implements OnInit {
	@Input() frete: number = 0
	@Input() cartTotal: number = 0
	@Input() desconto: number = 0
	constructor() { }
	ngOnInit(): void {
		if (this.frete == -1) this.frete = 0;
		console.log('FRETE', this.frete)
	}
}
