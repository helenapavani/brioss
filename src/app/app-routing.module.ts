import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetalhesPedidoComponent } from './components/detalhes-pedido/detalhes-pedido.component';
import { CarrinhoComprasComponent } from './components/carrinho-compras/carrinho-compras.component';
import { AuthGuard } from './guards/auth-guard.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { StatusPedidoComponent } from './components/status-pedido/status-pedido.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		// canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'cadastro',
		component: RegisterComponent,
	},
	{
		path: 'pagamento',
		component: DetalhesPedidoComponent,
		// canActivate: [AuthGuard],
	},
	{
		path: 'recuperarSenha',
		component: RecuperarSenhaComponent,
	},
	{
		path: 'carrinho',
		component: CarrinhoComprasComponent,
		// canActivate: [AuthGuard],
	},
	{
		path: 'perfil',
		component: PerfilComponent,
		// canActivate: [AuthGuard]
	},
	{
		path: 'status',
		component: StatusPedidoComponent,
		// canActivate: [AuthGuard],
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
