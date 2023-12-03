import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/components/carrinho-compras/Product';
import { ProductService } from 'src/app/components/core/services/product/product.service';
import { NovoItemEstoqueComponent } from '../novo-item-estoque/novo-item-estoque.component';

@Component({
	selector: 'app-estoque',
	templateUrl: './estoque.component.html',
	styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit, OnDestroy {
	@ViewChild(MatTable) table!: MatTable<Product>;

	private sub$ = new Subscription();

	allProduct: any[] = []

	displayedColumns: string[] = ['item', 'descricao', 'quantidade', 'alterar', 'status'];

	dataSource: Product[] = []

	constructor(private _productService: ProductService, public dialog: MatDialog) { }

	ngOnDestroy(): void {
		this.sub$.unsubscribe()
	}

	ngOnInit(): void {
		const sub = this._productService.getAllProducts().subscribe(data => {
			this.allProduct = data
			this.dataSource = data
		});

		this.sub$.add(sub);
	}

	addData() {
		const randomElementIndex = Math.floor(Math.random() * this.dataSource.length);
		this.dataSource.push(this.dataSource[randomElementIndex]);
		this.table.renderRows();
	}


	openDialog() {
		const dialogRef = this.dialog.open(NovoItemEstoqueComponent, {
			data: {
			},
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

}
