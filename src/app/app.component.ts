import { Component } from '@angular/core';
import { Operation } from './classes/Operation/operation';
import { Vector } from './classes/Vector/vector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  operation: Operation;
  titulos: Array<string>;
  datos: Array<string[]>;
  vector: Vector;
  error: string;
  rangos: Array<number>;

  constructor() {
    this.operation = new Operation();
  }

  /**
   * Este metodo se llama cada vez que se seleccione un archivo
   * @param event evento que contiene el archivo .csv
   */
  fileChanged(event) {
    const file: File = event.srcElement.files[0];
    const lector: FileReader = new FileReader();
    lector.readAsText(file);
    lector.onloadend = (e) => { // Ya tengo el resultado ahora lo proceso
      const resultado = lector.result;
      this.crearVectores(resultado);
    };
  }

  crearVectores(texto: string) {
    /** Las filas estarian separadas en el archivo .csv por el caracter de nueva linea */
    const filas = texto.split('\n');
    this.titulos = filas.shift().split(';'); // los titulos estan en la primera fila
    const vectores = [];
    /** Extraigo los datod para formar las columnas */
    filas.forEach((val) => {
      const valores = val.split(';');
      for (const i in valores) {
        if (valores.hasOwnProperty(i)) {
          if ( vectores[i] ) {
            vectores[i].push(valores[i]);
          }else {
            vectores[i] = [valores[i]];
          }
        }
      }
    });
    this.datos = vectores;
  }

  /**
   * Se selecciona el vector a calcular los rangos
   * @param i Inidice seleccionado
   * @throws TypeError cuando el vector seleccionado no cumple que sea numerico
   */
  seleccionar(i: number) {
    this.error = null;
    const datos = this.datos[i];
    try {
      const datosConPunto = [];
      for (const j in datos) {
        if (datos.hasOwnProperty(j)) {
          // Hay que cambiar las , por .
          // El .csv viene de excel y alli los numeros con decimales se trabajan con comas(,)
          datosConPunto.push(datos[j].replace(/\,/g, '.'));
        }
      }
      /** Valido que los datos sean numericos */
      const vector  = this.operation.stringToNumber(datosConPunto);
      /** Se crea el vector y se calculan los rangos */
      this.vector = new Vector(vector);
      this.rangos = this.vector.rangos;
    } catch (error) {
      console.error(error.message);
      this.error = error.message;
    }
  }

}
