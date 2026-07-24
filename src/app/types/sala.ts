import { Asiento } from "./asiento";

//Caada sala tendra 4 filas de asientos con 4 columndas
export interface Sala{
    id: number,
    nombre:string,
    asientos?: Asiento[]
}