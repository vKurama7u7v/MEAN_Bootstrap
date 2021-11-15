import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/crud-model';

@Injectable({
  providedIn: 'root'
})
export class CrudServicesService {

  url = 'http://localhost:8000/api/items/';

  constructor(private http: HttpClient) { }

  // FUNCIONES CRUD
  getItems(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarItem(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  agregarItem(item: Item): Observable<any> {
    return this.http.post(this.url, item);
  }

  obtenerItem(id: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  editarItem(id: string, item: Item): Observable<any> {
    return this.http.put(this.url + id, item);
  }
}
