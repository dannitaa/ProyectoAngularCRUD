import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/pedidos.service';
import { Pedido } from 'src/app/pedido';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  pedido: Pedido = new Pedido(" ", 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService
  ) {}

  ngOnInit() {
    let idPedido: string | null = this.route.snapshot.paramMap.get("id");

    if (idPedido !== null) {
      const url = idPedido ? `getPedido/${idPedido}` : 'getPedido';
      console.log('URL de la solicitud:', url);
      this.pedidosService.getPedido(idPedido).subscribe(
        (pedido: Pedido) => {
          console.log('Respuesta de la solicitud:', pedido);
          if (pedido) {
            this.pedido = pedido;
          } else {
            console.error("No se encontró el pedido");
          }
        },
        error => {
          console.error("Error al obtener el pedido", error);
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/menu']);
  }

  onSubmit() {
    this.pedidosService.updatePedido(this.pedido).subscribe(
      () => {
        console.log('Pedido actualizado correctamente');
        this.volver();
      },
      error => {
        console.error("Error al actualizar el pedido", error);
        // Puedes manejar el error de otra manera aquí
      }
    );
  }
}
