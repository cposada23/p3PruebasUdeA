/**
 * Clase vector para guardar los resutados de:
 * Media
 * Desviacion estandar
 * Parametros de regresion
 * Redondeo de números
 * @author Camilo Posada Angel <cposadaa@gmail.com>
 */
import { Operation } from '../Operation/operation';

export class Vector {


    private operation: Operation;
    private _vector: Array<number>;
    private _mediaVector: number;
    private _desviacionVector: number;
    private _vectorLogaritmo: Array<number>;
    private _mediaVectorLog: number;
    private _desviacionVectorLog: number;
    private _rangos: Array<number>;

    constructor(vector: Array<number>) {
        this.operation = new Operation();
        this._vector = vector;
        this._mediaVector = this.operation.mean(this._vector);
        this._desviacionVector = this.operation.standarDeviation(this._vector, this._mediaVector);
        this._vectorLogaritmo = this.operation.vectorLogaritmo(this._vector);
        this._mediaVectorLog = this.operation.roudToN(this.operation.mean(this._vectorLogaritmo), 4);
        this._desviacionVectorLog = this.operation.roudToN(this.operation.standarDeviation(this._vectorLogaritmo, this._mediaVectorLog), 4);
        this._rangos = this.operation.logarithmicRanges(this._mediaVectorLog, this._desviacionVectorLog);
    }

    get rangos(): Array<number> {
        return this._rangos;
    }
}
