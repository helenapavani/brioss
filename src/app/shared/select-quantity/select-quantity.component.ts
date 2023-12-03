import { NodeWithI18n } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-select-quantity',
	templateUrl: './select-quantity.component.html',
	styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {
	@Output() quantityEmitter = new EventEmitter();
	quantidade = 0

	constructor() { }

	ngOnInit() {
	}

	diminuirQuantidade() {
		if (this.quantidade > 0) {
			this.quantidade--
			this.quantityEmitter.next(this.quantidade)
		}
	}

	aumentarQuantidade() {
		this.quantidade++
		this.quantityEmitter.next(this.quantidade)
	}
}
