"use client";
import React from "react";
import { useAppSelector } from "../redux/hook";
import ButtonGeneric from "./ButtonGeneric";
import CardGeneric from "./CardGeneric";
import { Pelicula } from "../types/pelicula";

interface FormPeliculaProp {
    idPeli: string;
    onSucces: (pelicula:Pelicula | undefined) => void;
}

export default function FormularioPelicula({
    idPeli,
    onSucces
}: FormPeliculaProp) {
   
    const peliculas = useAppSelector((state) => state.pelicula);
    const salas = useAppSelector((state) => state.sala);

   
    const peliculaEncontrada = peliculas.list.find((p) => p.id === idPeli);
    const salaEncontrada = salas.list.find((s) => s.id === peliculaEncontrada?.salaID);

    
    if (!peliculaEncontrada) {
        return <p style={{ color: "var(--text-muted)" }}>Cargando información de la película...</p>;
    }

    
    const totalAsientos = salaEncontrada?.asientos?.length || 0;
    const asientosOcupados = salaEncontrada?.asientos?.filter(asiento => asiento.ocupado).length || 0;
    const asientosDisponibles = totalAsientos - asientosOcupados;

    return (
        <div style={styles.container}>
            {/* Sección superior: Imagen (Placeholder) e Información principal */}
            <div style={styles.movieHeader}>
                <div style={styles.imagePlaceholder}>
                    <span style={styles.imageIcon}>🎬</span>
                </div>

                <div style={styles.infoContainer}>
                    <h3 style={styles.title}>{peliculaEncontrada.nombre}</h3>
                    <p style={styles.detailItem}><strong>Género:</strong> {peliculaEncontrada.genero}</p>
                    <p style={styles.detailItem}><strong>Clasificación:</strong> {peliculaEncontrada.clasificacion}</p>
                    <p style={styles.detailItem}><strong>Duración:</strong> {peliculaEncontrada.duracion} min</p>
                    <p style={styles.detailItem}><strong>Horario:</strong> {peliculaEncontrada.horaInicio}</p>
                    <p style={styles.detailItem}><strong>Precio por boleto:</strong> ${peliculaEncontrada.precio.toFixed(2)}</p>
                </div>
            </div>

            <hr style={styles.divider} />

            {/* Sección intermedia: Estado de la Sala y Asientos */}
            <div style={styles.salaInfoContainer}>
                <h4 style={{ margin: 0 }}>{salaEncontrada?.nombre || `Sala ${peliculaEncontrada.salaID}`}</h4>
                <div style={styles.statsContainer}>
                    <CardGeneric labelString="Disponibles">
                        <span style={styles.statValueFree}>{asientosDisponibles}</span>
                    </CardGeneric>
                    <CardGeneric labelString="Ocupados">
                        <span style={styles.statValueOccupied}>{asientosOcupados}</span>
                    </CardGeneric>
                    <CardGeneric labelString="Total Sala">
                        <span style={styles.statValue}>{totalAsientos}</span>
                    </CardGeneric>
                </div>
            </div>

            <hr style={styles.divider} />

            {/* Sección inferior: Acción */}
            <div style={styles.actionContainer}>
                <ButtonGeneric color="var(--success)" onClickBtn={()=>{ onSucces(peliculas.list.find(peli => peli.id === idPeli ))}}>
                    Confirmar y Seleccionar Asientos
                </ButtonGeneric>
            </div>
        </div>
    );
}

// Objeto de estilos adaptado a las variables CSS de globals.css
const styles: Record<string, React.CSSProperties> = {
    container: {
        backgroundColor: "var(--surface)",
        border: "1px solid var(--surface-border)",
        borderRadius: "12px",
        padding: "24px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        color: "var(--foreground)",
    },
    movieHeader: {
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
    },
    imagePlaceholder: {
        width: "120px",
        backgroundColor: "var(--surface-border)",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        backgroundImage: "url('/video.png')", // Reutilizando tu placeholder de TablaPeliculas
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    imageIcon: {
        fontSize: "2.5rem",
        opacity: 0.5,
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flexGrow: 1,
    },
    title: {
        margin: "0 0 8px 0",
        fontSize: "1.25rem",
        color: "var(--primary)",
        fontWeight: "bold",
    },
    detailItem: {
        margin: 0,
        fontSize: "0.9rem",
    },
    divider: {
        border: "none",
        borderTop: "1px solid var(--surface-border)",
        margin: "20px 0",
    },
    salaInfoContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    statsContainer: {
        display: "flex",
        gap: "12px",
        justifyContent: "space-between",
    },

    statValue: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "var(--foreground)",
    },
    statValueFree: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "var(--success)",
    },
    statValueOccupied: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "var(--primary)",
    },
    actionContainer: {
        display: "flex",
        justifyContent: "flex-end",
    }
};