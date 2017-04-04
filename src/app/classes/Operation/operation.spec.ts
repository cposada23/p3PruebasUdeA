import {  async } from '@angular/core/testing';

import { Operation } from './operation';

describe('Operation.ts', () => {
  let op: Operation;
  beforeEach(async(() => {
      op = new Operation();
  }));
  it('Debe calcular la media de un arreglo numerico', () => {
      const arr = [3, 4, 5];
      expect(op.mean(arr)).toBe(4);
  });

  it('Debe devolver NaN cuando el vector se pasa vacio []', () => {
      const arr = [];
      expect(op.mean(arr)).toBeNaN();
  });

  it('Debe calcular la desviacion Estandar pasando la media del vector', () => {
    const arr = [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503];
    const media = op.mean(arr);
    let desviacionStandar = op.standarDeviation(arr, media);
    desviacionStandar = op.roundTo2(desviacionStandar);
    expect(media).toBe(550.6);
    expect(desviacionStandar).toBe(572.03);
  });

  it('Debe retornar el arreglo con sus elementos al cuadrado', () => {
    let arreglo = [2, 4];
    arreglo = op.vectorAlCuadrado(arreglo);
    expect(arreglo).toEqual([4, 16]);
  });

  it('Debe redondear un numero a cierto número n de decimales', () => {
      let numero = 3.141586;
      numero = op.roudToN(numero, 4);
      expect(numero).toBe(3.1416);
  });

  it('Debe retornar el arreglo sacando el logaritmo natural a todos sus elementos', () => {
      let arreglo = [2, 4];
      arreglo = op.vectorLogaritmo(arreglo);
      expect(arreglo).toEqual([0.6931, 1.3863]);
  });

  it('Debe retorna un vector con el size per item', () => {
      const vector = [1, 1, 3, 6, 8, 11, 3, 7];
      const sizePerItem = op.sizePerItem(vector);
      expect(sizePerItem).toEqual([0.025, 0.025, 0.075, 0.15, 0.2, 0.275, 0.075, 0.175]);
  });

  it('Debe calcular los rangos VS, S, M, L, VL', () => {
      const media = 2.8015;
      const desviacion = 0.6605;
      let rangos = op.logarithmicRanges(media, desviacion);
      // expect(rangos).toEqual([1.4805, 2.1410, 2.8015, 3.4620, 4.1225]);
      rangos = rangos.map((val) => {
          return op.roudToN(val, 3);
      });
      expect(rangos).toEqual([4.395, 8.508, 16.469, 31.881, 61.713]);
  });

  it('Debe validar que un vector sea de tipo numerico', () => {
      let vect = [1, 2, 3];
      vect = op.validarVectorNumerico(vect);
      expect(vect).toBeTruthy();
  });

   it('debe arrojar un error cuando se ingresa datos no numericos', ()=>{
     const datos = ['1', 2, 3];
     expect(function(){ op.validarVectorNumerico(datos); } ).toThrow(new TypeError('El vector contiene elementos no numéricos'));
   });

   it('debe retornar un array numerico', () => {
       const datos = ['1', '2', '3'];
       const vect = op.stringToNumber(datos);
       expect(vect).toEqual([1, 2, 3]);
   });

   it('debe lanzar una excepcion cuando el array contiene elementos que no se pueden castear a number', () => {
       const datos = ['1,2', 'a'];
       expect(function(){ op.stringToNumber(datos); }).toThrow(new TypeError('El vector contiene elementos no numericos'));
   });

});
