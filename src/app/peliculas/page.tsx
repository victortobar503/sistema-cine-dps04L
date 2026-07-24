//Acá irá la gestion de peliculas! Modulo 1
//Modulo 5
//Modulo 6
"use client";
import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { agregarPelicula, eliminarPelicula } from '../redux/slices/peliculasSlice';
import { salas } from '@/store/salas';
import { apartarAsiento } from '../redux/slices/salasSlice';


//NUNCA SE MUTA DESDE ESTA FUNCION!. POR QUE SI NO REACT QUIERE VOLVER A CONSTRUIR TODO Y VALE VEINTE
export default function MoviePage() {

  const pelicula = useAppSelector((state) => state.pelicula);
  const sala = useAppSelector((state)=> state.sala)
  const dispatch = useAppDispatch();

  const borrar = ()=>{dispatch(agregarPelicula({id:"ads",nombre: "El reino delpepe", genero: "Mierda", duracion: 30, clasificacion: "A", horaInicio: "6:00", salaID: 1, precio: 7, estado: true}));}
  console.log(sala.list);
  
  return (
    <>
      <header className="dashboard-header">
        <h1 onClick={borrar}>Gestion de Peliculas</h1>
      </header>
      {sala.error ? "<p>"+sala.error+"</p>" : ""}
    </>
   
  );
}

