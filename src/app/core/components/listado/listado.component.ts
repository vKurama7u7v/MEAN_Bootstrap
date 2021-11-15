import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Item } from '../../models/crud-model';
import { CrudServicesService } from '../../services/crud-services.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']

})
export class ListadoComponent implements OnInit {

  listaItems: Item[] = [];

  constructor(private _crudService: CrudServicesService) { }

  ngOnInit(): void {
    this.obtenerItems();
  }

  obtenerItems(){
    this._crudService.getItems().subscribe(data => {
      console.log(data);
      this.listaItems = data;
    },error => {
      console.log(error);
      Swal.fire({
        title: 'Servidor Apagado 😕',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 5000
      })
    })
  }

  addItem(){
    Swal.fire({
      title: 'NUEVO ITEM',
      html:`
      <form>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder=""
            maxlength="30"
            required
          >
          <label for="floatingInput">Nombre</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder=""
            maxlength="30"
            required
          >
          <label for="floatingInput">Descripción</label>
        </div>
      </form>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        // Obteniendo los valores de los campos
        const name = (<HTMLInputElement>document.getElementById('name')).value;
        const desc = (<HTMLInputElement>document.getElementById('description')).value;

        // Validando que nombre & descripcion no esten vacios
        if(!name || !desc) {
          Swal.showValidationMessage('Porfavor rellena los campos');
        }

        // retornando objeto con sus valores
        return {nombre: name, descripcion: desc}
      }
    }).then((result) => {
      // Valores de Objeto diferentes de Undefined
      if(!(!result.value?.nombre || !result.value?.descripcion)){
        // Creando Objeto con sus parametros
        const ITEM: Item = {
          nombre: result.value?.nombre,
          descripcion: result.value?.descripcion,
        }

        console.log(ITEM);

        this._crudService.agregarItem(ITEM).subscribe(data => {
          Swal.fire({
            title: 'Item Agregado Correctamente!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
          this.obtenerItems();
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Error al Agregar Item!',
            icon: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
        })

      }
    })
  }

  eliminarItem(id: any){
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este Item?',
      text: 'No podras revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value){
        this._crudService.eliminarItem(id).subscribe(data => {
          Swal.fire({
            title: 'Item Eliminado con Exito!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
          this.obtenerItems();

        }, error => {
          Swal.fire({
            title: 'Error al Eliminar Item!',
            icon: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
          console.log(error);
        })
      }
    })
  }

  esItem(id: any){
    if(id !== null){
      this._crudService.obtenerItem(id).subscribe(data => {
        const nombre = data.nombre;
        const descripcion = data.descripcion;
        this.editarItem(id, nombre, descripcion);
      })
    }
  }

  editarItem(id: string, nombre: string, descripcion: string){
    Swal.fire({
      title: 'EDITAR ITEM',
      html:`
      <form>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder=""
            value="${nombre}"
            maxlength="30"
            required
          >
          <label for="floatingInput">Nombre</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder=""
            value="${descripcion}"
            maxlength="30"
            required
          >
          <label for="floatingInput">Descripción</label>
        </div>
      </form>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        // Obteniendo los valores de los campos
        const name = (<HTMLInputElement>document.getElementById('name')).value;
        const desc = (<HTMLInputElement>document.getElementById('description')).value;

        // Validando que nombre & descripcion no esten vacios
        if(!name || !desc) {
          Swal.showValidationMessage('Porfavor rellena los campos');
        }

        if(!(name !== nombre || desc !== descripcion)){
          Swal.showValidationMessage('No se detectaron cambios');
        }

        // retornando objeto con sus valores
        return {nombre: name, descripcion: desc}
      }
    }).then((result) => {

      if(!(!result.value?.nombre || !result.value?.descripcion)){

        const NEW_ITEM: Item = {
          nombre: result.value?.nombre,
          descripcion: result.value?.descripcion,
        }

        console.log(NEW_ITEM);

        this._crudService.editarItem(id,NEW_ITEM).subscribe(data => {
          Swal.fire({
            title: 'Item Editado Correctamente!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
          this.obtenerItems();
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Error al Editar Item!',
            icon: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
        })



      }

    })
  }

}
