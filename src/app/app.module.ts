import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/button/button.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { StatusPedidoComponent } from './components/status-pedido/status-pedido.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { CarrinhoComprasComponent } from './components/carrinho-compras/carrinho-compras.component';
import { SharedModule } from './shared/shared.module';
import { EscolherEntregaComponent } from './components/carrinho-compras/escolher-entrega/escolher-entrega.component';
import { CupomDescontoComponent } from './components/carrinho-compras/cupom-desconto/cupom-desconto.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetalhesPedidoComponent } from './components/detalhes-pedido/detalhes-pedido.component';
import { TabelaPedidosComponent } from './components/detalhes-pedido/tabela-pedidos/tabela-pedidos.component';
import { PrecoInformacoesComponent } from './components/carrinho-compras/preco-informacoes/preco-informacoes.component';
import { AuthGuard } from './guards/auth-guard.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { JwtInterceptor } from './intercept/jwt-intercept';

@NgModule({
	declarations: [
		AppComponent,
		ButtonComponent,
		LoginComponent,
		RegisterComponent,
		RecuperarSenhaComponent,
		FooterComponent,
		HeaderComponent,
		StatusPedidoComponent,
		PagamentoComponent,
		HomeComponent,
		CarrinhoComprasComponent,
		EscolherEntregaComponent,
		CupomDescontoComponent,
		DetalhesPedidoComponent,
		TabelaPedidosComponent,
		PrecoInformacoesComponent,
		PerfilComponent,
		// DashboardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MaterialModule,
		SharedModule,
		NgSelectModule,
		AngularSvgIconModule.forRoot(),
	],
	exports: [
		NgSelectModule
	],
	providers: [
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true,
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
