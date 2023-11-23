import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/pedido';
import { PedidosService } from 'src/app/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  pedidoModel = new Pedido("", 0, undefined);

  onSubmit() {
    this.pedidosService.addPedido(this.pedidoModel).subscribe(
      (response) => {
        console.log(response); // Imprime la respuesta completa en la consola
        // Resto del código...
        this.router.navigate(['/menu']);
      },
      (error) => {
        console.error(error); // Imprime cualquier error en la consola
        // Resto del código...
      }
    );
  }
   volver() {
    this.router.navigate(['/menu']);
  }
}
