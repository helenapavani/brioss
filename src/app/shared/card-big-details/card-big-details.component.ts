import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/components/carrinho-compras/Product';

@Component({
	selector: 'app-card-big-details',
	templateUrl: './card-big-details.component.html',
	styleUrls: ['./card-big-details.component.scss']
})
export class CardBigDetailsComponent implements OnInit {
	@Input() product!: Product;
	constructor() { }

	ngOnInit() {
	}

}
