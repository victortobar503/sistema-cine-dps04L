import { Pelicula } from "@/app/types/pelicula";
import { peliculas } from "@/store/peliculas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { act } from "react";

interface PeliculaState{
    list: Pelicula[],
    error: string | null
}

const initialState: PeliculaState = { list: peliculas, error: null}

const peliculaSlice = createSlice(
    {
        name: "pelicula",
        initialState,
        reducers: {
            agregarPelicula: (state,action: PayloadAction<Pelicula>)=>{
                const peliculaRepetida = state.list.find(
                    p =>{
                        return p.id === action.payload.id
                    }
                )

                if(peliculaRepetida){
                    state.error = `Error Critico: La pelicula ${peliculaRepetida.nombre} ya existe en cartelera.`
                    return;
                }
                state.list.push(action.payload);
            },
            modificarPelicula: (state, action: PayloadAction<Pelicula>) => {
                /* const peliculaNueva = action.payload;
                const pelicula = state.list.find( p => p.id === action.payload.id)

                if(pelicula){
                    pelicula.nombre = peliculaNueva.nombre;
                } */
               const peliculaNueva = action.payload
               const peliculaAnt = state.list.findIndex( p => p.id === peliculaNueva.id);

                if(peliculaNueva){
                    state.list[peliculaAnt] = peliculaNueva;
                }else{
                    state.error = `Ha ocurrido un error fatal en la modificacion.`
                }
            },
            eliminarPelicula :  (state, action: PayloadAction<string>) => {
                const peliculaNueva = action.payload;
                const peliculaAnt = state.list.filter( p => p.id !== peliculaNueva);
                if(peliculaAnt){
                    state.list = peliculaAnt;
                }else{
                    state.error = `Ha ocurrido un error fatal en la eliminacion.`;
                }
            },
            clearError: (state)=>{
                state.error = null;
            }
        }
    }
);
export const {
    agregarPelicula,
    modificarPelicula,
    eliminarPelicula,
    clearError
} = peliculaSlice.actions;

export default peliculaSlice.reducer;