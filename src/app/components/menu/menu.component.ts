import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/pedido';
import { PedidosService } from 'src/app/pedidos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pedidos: Pedido[] = [
    new Pedido("Hamburguesa de cerdo", 50)
  ];

  constructor(private pedidosService: PedidosService) { }

  eliminarPedido(pedido: Pedido) {
    if (confirm(`¿Realmente quieres eliminar a ${pedido.nombre}?`)) {
      this.pedidosService.deletePedido(pedido).subscribe(() => {
        this.obtenerPedidos();
      });
    }
  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidosService.getPedidos().subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
      (error: any) => {
        console.error('Error al obtener pedidos', error);
      }
    );
  }
}