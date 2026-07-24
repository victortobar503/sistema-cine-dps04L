"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import ButtonGeneric from "./ButtonGeneric";
import { Pelicula } from "../types/pelicula";
import { Reserva } from "../types/reserva";
import { agregarReserva } from "../redux/slices/reservasSlice";

interface ReservaProp {
    asientosID: string[];
    salaID: number; 
    pelicula: Pelicula;
    onSubmit: (nombreUsuario: string, reservaID: string) => void;
}


const calcularHoraFin = (horaInicio: string, duracionMinutos: number) => {
    const [horas, minutos] = horaInicio.split(":").map(Number);
    const fechaTemp = new Date();
    fechaTemp.setHours(horas, minutos + duracionMinutos, 0);
    return `${fechaTemp.getHours().toString().padStart(2, '0')}:${fechaTemp.getMinutes().toString().padStart(2, '0')}`;
};

export default function FormularioReserva({asientosID,salaID, pelicula, onSubmit}: ReservaProp) {
    
    const [nombreUsuario, setNombreUsuario] = useState("");

    const dispatch = useAppDispatch();
    const reserva = useAppSelector((state) => state.reserva.list);
    const salas = useAppSelector((state) => state.sala.list);

    // Búsqueda de las entidades involucradas
    const sala = salas.find(s => s.id === salaID);

    if (!pelicula || !sala) {
        return <p style={{ color: "var(--text-muted)" }}>Error: No se pudo cargar la información de la reserva.</p>;
    }

    // Cálculos de la reserva
    const totalPagar = asientosID.length * pelicula.precio;
    const horaFinalizacion = calcularHoraFin(pelicula.horaInicio, pelicula.duracion);
    const fechaCompra = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    
    // Generación segura del nuevo ID (previene errores si el arreglo está vacío)
    const nuevoUsuarioID = reserva.length > 0 ? reserva[reserva.length - 1].usuarioID + 1 : 67;
    const nuevaReservaID = reserva.length > 0 ? reserva[reserva.length - 1].Id + 1 : 1;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        const reserva: Reserva = {
            Id: nuevaReservaID,
            usuarioID: nuevoUsuarioID,
            nombreUsuario: nombreUsuario,
            peliculaID: pelicula.id,
            total: totalPagar,
            horaInicio: pelicula.horaInicio,
            horaFinalizacion: horaFinalizacion,
            fechaCompra: fechaCompra,
            asientos: asientosID
        }

        dispatch(agregarReserva({reserva: reserva, salaID: salaID}));
        onSubmit(nombreUsuario, nuevaReservaID.toString());
    };

    return (
        <div style={styles.container}>
            <div style={styles.ticketHeader}>
                <h3 style={styles.ticketTitle}>Resumen de Venta</h3>
                <span style={styles.ticketDate}>{fechaCompra}</span>
            </div>

            <hr style={styles.divider} />

            <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Película</span>
                    <span style={styles.detailValue}>{pelicula.nombre}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Sala</span>
                    <span style={styles.detailValue}>{sala.nombre}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Horario</span>
                    <span style={styles.detailValue}>{pelicula.horaInicio} - {horaFinalizacion}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Asientos ({asientosID.length})</span>
                    <div style={styles.badgesContainer}>
                        {asientosID.map(asiento => (
                            <span key={asiento} style={styles.badge}>{asiento}</span>
                        ))}
                    </div>
                </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.totalContainer}>
                <span style={styles.totalLabel}>Total a Pagar</span>
                <span style={styles.totalValue}>${totalPagar.toFixed(2)}</span>
            </div>

            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel} htmlFor="nombreCliente">Nombre del Cliente (Opcional)</label>
                    <input 
                        id="nombreCliente"
                        type="text" 
                        style={styles.input} 
                        placeholder="Ej. Laura Gómez" 
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                </div>

                <div style={styles.actionContainer}>
                    <ButtonGeneric width="100%" color="var(--success)">
                        Confirmar y Finalizar Venta
                    </ButtonGeneric>
                </div>
            </form>
        </div>
    );
}

// Estilos enfocados en parecer un ticket de compra / checkout
const styles: Record<string, React.CSSProperties> = {
    container: {
        backgroundColor: "var(--surface)",
        border: "1px solid var(--surface-border)",
        borderRadius: "12px",
        padding: "30px",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        color: "var(--foreground)",
    },
    ticketHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ticketTitle: {
        margin: 0,
        fontSize: "1.25rem",
        color: "var(--primary)",
        fontWeight: "bold",
    },
    ticketDate: {
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        fontWeight: 500,
    },
    divider: {
        border: "none",
        borderTop: "2px dashed var(--surface-border)",
        margin: "20px 0",
    },
    detailsGrid: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    detailItem: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    detailLabel: {
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    detailValue: {
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--foreground)",
    },
    badgesContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "4px",
    },
    badge: {
        backgroundColor: "var(--primary-light)",
        color: "var(--primary)",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "0.85rem",
        fontWeight: "bold",
        border: "1px solid var(--primary)",
    },
    totalContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--success-light)",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "24px",
    },
    totalLabel: {
        fontSize: "1rem",
        fontWeight: "bold",
        color: "var(--success)",
    },
    totalValue: {
        fontSize: "1.5rem",
        fontWeight: "900",
        color: "var(--success)",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    inputLabel: {
        fontSize: "0.85rem",
        fontWeight: "bold",
        color: "var(--foreground)",
    },
    input: {
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid var(--surface-border)",
        fontSize: "1rem",
        outline: "none",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "inherit",
    },
    actionContainer: {
        marginTop: "10px",
    }
};