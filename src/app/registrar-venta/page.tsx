"use client";

import { useState } from "react";
import Link from "next/link";
import ButtonGeneric from "../components/ButtonGeneric";
import TablaPelicula from "../components/TablaPeliculas";
import FormularioPelicula from "../components/FormularioPelicula";
import MapaAsientos from "../components/MapaAsientos";
import { Pelicula } from "../types/pelicula";
import "./style.css";
import { Asiento } from "../types/asiento";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { apartarAsiento } from "../redux/slices/salasSlice";
import FormularioReserva from "../components/FormularioReserva";

export default function RegistrarVenta() {
    const sala = useAppSelector((state)=> state.sala)
    const [paso, setPaso] = useState(1);
    const [idPelicula, setIdPelicula] = useState<string | null>(null);
    const [asientos, setAsientos] = useState<string[]>([]);
        //ESTO JAMAS SE HACE EN REACT!
    /* let peliculaSeleccionada: Pelicula; */
    
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);

    const handlePeliculaSeleccionada = (id: string) => {
        setIdPelicula(id);
        setPaso(2);
    };

    const handleFormularioCompletado = (pelicula: Pelicula | undefined) => {
        // 2. Guardamos la película utilizando el setter del useState
        if(pelicula)
        setPeliculaSeleccionada(pelicula);
        setPaso(3);
    };

    const handleAsientosApartados = (asientosID: string[])=>{
        setAsientos(asientosID);
        setPaso(4);
    };

    const handleReserva = (nombreUsuario: string, reservaID: string) =>{
        console.log(nombreUsuario);
        console.log(reservaID);
        setPaso(1);
    }
    const volverAtras = () => {
        setPaso((prev) => prev - 1);
    };

    return (
        <>
           
            <header className="dashboard-header">
                <h1>REGISTRO DE VENTAS</h1>
            </header>
            
            <section className="fixed-container">
                <Link href='/'>
                    <ButtonGeneric color="">Omitir proceso</ButtonGeneric>
                </Link>
            </section>

            <section className="sale-container">
            {/* Paso 1: Selección de Película */}
                {paso === 1 && (
                    <>
                        <h2>Selecciona una película</h2>
                        <TablaPelicula onClick={handlePeliculaSeleccionada} />
                    </>
                )}

               
                {paso === 2 && (
                    <>
                        <FormularioPelicula 
                            onSucces={handleFormularioCompletado} 
                            idPeli={idPelicula ? idPelicula : ""} 
                        />
                        <div style={{ marginTop: '20px' }}>
                            <ButtonGeneric color="#64748b" width="350px" onClickBtn={volverAtras}>
                                Volver
                            </ButtonGeneric>
                        </div>
                    </>
                )}

                
                {paso === 3 && peliculaSeleccionada && (
                    <>
                        <h2 style={{marginBottom: "20px"}}>Selección de asientos</h2>
                        <MapaAsientos salaId={peliculaSeleccionada.salaID} onConfirm={handleAsientosApartados} />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <ButtonGeneric color="#64748b"width="350px" onClickBtn={volverAtras}>
                                Volver
                            </ButtonGeneric>
                        </div>
                    </>
                )}

                
                {paso === 4 && (
                    <>
                        <FormularioReserva pelicula={peliculaSeleccionada as Pelicula} salaID={peliculaSeleccionada?.salaID as number } asientosID={asientos}
                        onSubmit={handleReserva}
                        />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap:"wrap", justifyContent: "center" }}>
                            <ButtonGeneric color="#64748b"width="350px" onClickBtn={volverAtras}>
                                Volver
                            </ButtonGeneric>
                        </div>
                    </>
                )}
            </section>
        </>
    );
}