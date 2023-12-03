import { AuthGuard } from './../../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: 'pedidos', component: PedidosComponent },
			{ path: 'estoque', component: EstoqueComponent },
		],
		canActivate: [AuthGuard, AdminGuard],
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
