
/**
 * Clase para operaciones con vectores
 * Media
 * Desviacion estandar
 * Parametros de regresion
 * Redondeo de números
 * @author Camilo Posada Angel <cposadaa@gmail.com>
 */
export class Operation {


    /**
     * Calcula la media de un vector numerico
     * @param vector a calcular la media
     * @returns media Media del vector
     */
    mean(vector: Array<number>): number {
        try {
            let media = 0;
            const sum = vector.reduce((a, b) => {
                return a + b;
            });
            media = sum / vector.length;  // excepciones aritmeticas
            // media = this.roundTo2(media); // se redondea a dos decimales.
            return media;
        } catch (error) {
            return NaN;
        }
    }


    /**
     * Calcula la desviacion estandar de un vector numerico dada su media
     * @param vector a calcular la desviacion estandar
     * @param media del vector
     * @returns desviacion Desviacion estandar del vector
     */
    standarDeviation(vector: Array<number>, media: number): number {
        try {
            let sumaCuadrados = 0;
            let arregloCuadrados: Array<number> = [];
            let desviacion = 0;
            arregloCuadrados = vector.map((num) => {
                return Math.pow(num - media, 2);
            });
            sumaCuadrados = arregloCuadrados.reduce((a, b) => {
                return a + b;
            });
            desviacion = Math.sqrt(sumaCuadrados  / (vector.length - 1));
            // desviacion = this.roundTo2(desviacion);
            return desviacion;
        } catch (error) {
            return NaN;
        }
    }

    /**
     *
     * @param x vector x  a calcular la relacion con y
     * @param xavg media del vector x
     * @param sumXCuadrado suma de los elementos al cuadrado del vector x
     * @param y vector y a calcular la relacion con x
     * @param yavg media del vector y
     * @param sumYCuadrado suma de los elementos al cuadrado del vector y
     * @returns vector con los parametros de regresion [0] -> B1, [1] -> B2
     */
    calculateRegresionParameters(x: Array<number>, xSuma: number, xavg: number,
                                 sumXCuadrado: number, y: Array<number>, ySuma: number,
                                 yavg: number, sumYCuadrado: number ): Array<number> {
        const sumatoria = this.calcularSumAxB(x, y);
        const n = x.length;
        const b1 = ( sumatoria - ( n * xavg * yavg ) ) / ( sumXCuadrado - (n * (xavg * xavg)));
        const b0 = yavg - ( b1 * xavg );
        // La parte de arriba de la formula
        const arriba = ( ( n * sumatoria ) - ( xSuma * ySuma ));
        // La parte de abajo sin la raiz
        let abajo = (( n * sumXCuadrado ) - ( xSuma * xSuma ) ) * ( ( n * sumYCuadrado ) - ( ySuma * ySuma ) );
        abajo = Math.sqrt(abajo);
        const r = arriba / abajo;
        return [b0, b1, r, r * r];
    }


    /**
     * Retorna la suma de multiplicar a[i] * b[i]
     * @param a vector
     * @param b vector
     */
    calcularSumAxB(a: Array<number>, b: Array<number>): number {
        if (a.length !== b.length) {
            throw new Error('Los vectores deben tener el mismo numero de elementos');
        }
        let suma = 0;
        for ( const i in a ) {
            if (a.hasOwnProperty(i)) {
                suma += a[i] * b[i];
            }
        }
        return suma;
    }

    /**
     * Redonde un numero a dos decimales
     * @param numero a redondear
     */
    roundTo2(numero: number): number {
        return Math.round(numero * 100) / 100;
    }

    /**
     * Redondea un numero a cierto numero de decimales
     * @param numero Numero a redondear
     * @param decimales Numero de decimales que se quieren mostrar
     */
    roudToN(numero: number, decimales: number ): number {
        const r = Math.pow(10, decimales);
        return Math.round( numero * r ) / r;
    }

    /**
     * Valida que un vector contenga solo elementos te tipo numericos
     * @param vector vector a validar
     * @returns Array<number> retorna el arreglo en caso de que este sea numerico
     * @throws TypeError en caso de que el vector contenga elementos no mumericos
     */
    validarVectorNumerico(vector: Array<any>): Array<number> {
        for (const i in vector) {
            if (typeof(vector[i]) !== 'number') {
                throw new TypeError('El vector contiene elementos no numéricos');
            }
        }
        return vector;
    }

    /**
     * Toma un vector con strings ['1', '2.2'] y retorna uno numerico [1, 2.2]
     * @param vector a convertir en numerico
     * @return resultado: vector numerico
     * @throws TypeError cuando el vector contiene elementos a los que no se le pueden hacer castin a number
     */

    stringToNumber(vector: Array<any>): Array<number> {
        const resultado: Array<number> = [];
        for (const i in vector) {
            if (vector.hasOwnProperty(i)) { // Necesario por el prototype
                const dato = Number(vector[i]);
                if (dato) {
                    resultado.push(dato);
                }else {
                    throw new TypeError('El vector contiene elementos no numericos');
                }
            }
        }
        return resultado;
    }

    /**
     * Eleva todos los elementos de un vector al cuadrado
     * @param vector a calcular sus elementos al cuadrado
     * @returns Array con los elementos del vector al cuadrado
     */
    vectorAlCuadrado(vector: Array<number>): Array<number> {
        return  vector.map((x) => {
            return x * x;
        });
    }

    /**
     * Crea un vector con los elementos logaritmicos log(xi);
     * @param vector a calcular los elementos logaritmicos
     */
    vectorLogaritmo(vector: Array<number>): Array<number> {
        return vector.map((val) => {
            return this.roudToN(Math.log(val), 4);
        });
    }

    sizePerItem(vector: Array<number>): Array<number> {
        const suma = vector.reduce((a, b) => {
            return a + b;
        });

        return vector.map((val) => {
            return val / suma;
        });
    }

    /**
     * calcula los rangos
     * @param media
     * @param desviacion
     * @return [VS, S, M, L, VL]
     */
    logarithmicRanges(media: number, desviacion: number): Array<number> {
        let VS = this.roudToN( media - 2 * desviacion , 4);
        let S = this.roudToN(media - desviacion, 4);
        let M = this.roudToN(media, 4);
        let L = this.roudToN(media + desviacion, 4);
        let VL = this.roudToN(media + 2 * desviacion, 4);
        VS = this.roudToN(Math.pow(Math.E, VS), 4);
        S = this.roudToN(Math.pow(Math.E, S), 4);
        M = this.roudToN(Math.pow(Math.E, M), 4);
        L = this.roudToN(Math.pow(Math.E, L), 4);
        VL = this.roudToN(Math.pow(Math.E, VL), 4);
        return [VS, S, M, L, VL];
    }
}
