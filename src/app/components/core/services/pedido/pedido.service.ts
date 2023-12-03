import { AuthService } from './../../../../admin/services/auth.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment-test';
import { Pedidos } from 'src/app/pages/dashboard/pedidos/pedidos.component';

@Injectable({
	providedIn: 'root'
})
export class PedidoService {
	private readonly url = `${environment.API_URL}`
	private readonly routes = {
		statusPedido: `${this.url}/pedido-status`
	}
	constructor(private http: HttpClient, private authService: AuthService) { }

	getAllPedidos(): Observable<Pedidos[]> {
		return this.http.get<Pedidos[]>(`${this.url}/pedidos`);
	}

	updateStatusPedido(pedidoId: number) {
		const statusUpdated = { statusPedido: "Entregue" }
		return this.http.put<Pedidos>(`${this.url}/pedidos/${pedidoId}`, statusUpdated);
	}

	getPedidoByClienteId(): Observable<any> {
		const clienteId = Number(this.authService.getClientId)
		return this.http.post<any>(this.routes.statusPedido, { clienteId: clienteId });
	}


}

export interface PedidoClienteId {
	id: number;
	dataPedido: Date;
	statusPedido: string;
	clienteId: number;
	total: number;
	observacao: string;
	modoEntrega: string;
}
