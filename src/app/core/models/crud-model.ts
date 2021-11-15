export class Item {
    _id?: number;
    nombre: String;
    descripcion: String;

    constructor(
        nombre: String,
        descripcion: String,
    ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}