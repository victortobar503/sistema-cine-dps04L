import { Reserva } from "@/app/types/reserva";
import { reservas } from "@/store/reservas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface ReservasState {
    list: Reserva[],
    error: string | null
}
interface ReservaSala{
    reserva: Reserva,
    salaID: number
}
const initialState: ReservasState = { list: reservas, error: null}

const reservaSlice = createSlice({
    name: "reserva",
    initialState,
    reducers: {
        agregarReserva: (state, action: PayloadAction<ReservaSala>) =>{
            const reserva = action.payload;

            state.list.push(reserva.reserva);
        },
        modificarReserva: (state, action: PayloadAction<Reserva>)=>{
            const reserva = action.payload;
            const reservaIndex = state.list.findIndex(r => r.Id === reserva.Id);
            state.list[reservaIndex] = reserva;
            
        },
        //Prob para tener un boton de eliminar reserva.
        eliminarReserva: (state, action: PayloadAction<number>)=>{
            const idReserva = action.payload;

            state.list.filter(reserva =>{
                return reserva.Id !== idReserva
            })
        },
    }
});

export const {
    agregarReserva,
    modificarReserva,
    eliminarReserva
} = reservaSlice.actions

export default reservaSlice.reducer
