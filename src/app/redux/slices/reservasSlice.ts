import { Reserva } from "@/app/types/reserva";
import { reservas } from "@/store/reservas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReservasState {
    list: Reserva[],
    error: string | null
}
const initialState: ReservasState = { list: reservas, error: null}

const reservaSlice = createSlice({
    name: "reserva",
    initialState,
    reducers: {
        agregarReserva: (state, action: PayloadAction<Reserva>) =>{

        },
        //Prob para tener un boton de eliminar reserva.
        eliminarReserva: (state, action: PayloadAction<number>)=>{

        },
    }
});

export const {
    agregarReserva
} = reservaSlice.actions

export default reservaSlice.reducer
