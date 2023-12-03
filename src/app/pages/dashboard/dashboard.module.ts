import { SelectQuantityComponent } from './../../shared/select-quantity/select-quantity.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { EstoqueComponent } from './estoque/estoque.component';
import { NovoItemEstoqueComponent } from './novo-item-estoque/novo-item-estoque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPedidoComponent } from './pedidos/list-pedido/list-pedido.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
	imports: [
		CommonModule,
		DashboardRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		DragDropModule
	],
	declarations: [
		DashboardComponent,
		PedidosComponent,
		PedidosComponent,
		EstoqueComponent,
		NovoItemEstoqueComponent,
		SelectQuantityComponent,
		ListPedidoComponent
	],
	exports: [
		DashboardComponent,
		PedidosComponent,
		EstoqueComponent,
		NovoItemEstoqueComponent,
		SelectQuantityComponent,
		ListPedidoComponent
	]
})
export class DashboardModule { }
