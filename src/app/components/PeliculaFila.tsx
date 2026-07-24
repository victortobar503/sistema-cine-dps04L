"use client";

import { CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { eliminarPelicula, cambiarEstadoPelicula } from "@/app/redux/slices/peliculasSlice";
import { Pelicula } from "@/app/types/pelicula";
import ButtonGeneric from "./ButtonGeneric";

interface PeliculaFilaProps {
    pelicula: Pelicula;
    onEditar: (pelicula: Pelicula) => void;
}

export default function PeliculaFila({ pelicula, onEditar }: PeliculaFilaProps) {
    const dispatch = useAppDispatch();
    const sala = useAppSelector(state =>
        state.sala.list.find(s => s.id === pelicula.salaID)
    );

    function handleEliminar() {
        const confirmar = window.confirm(
            `¿Seguro que quieres eliminar "${pelicula.nombre}"? Esta acción no se puede deshacer.`
        );
        if (confirmar) {
            dispatch(eliminarPelicula(pelicula.id));
        }
    }

    function handleCambiarEstado() {
        dispatch(cambiarEstadoPelicula(pelicula.id));
    }

    return (
        <tr style={styles.row}>
            <td style={styles.cell}>{pelicula.id}</td>
            <td style={styles.cell}>{pelicula.nombre}</td>
            <td style={styles.cell}>{pelicula.genero}</td>
            <td style={styles.cell}>{pelicula.duracion} min</td>
            <td style={styles.cell}>{pelicula.clasificacion}</td>
            <td style={styles.cell}>{sala ? sala.nombre : `Sala ${pelicula.salaID}`}</td>
            <td style={styles.cell}>{pelicula.horaInicio}</td>
            <td style={styles.cell}>${pelicula.precio.toFixed(2)}</td>
            <td style={styles.cell}>
                <span style={pelicula.estado ? styles.badgeActiva : styles.badgeInactiva}>
                    {pelicula.estado ? "Activa" : "Inactiva"}
                </span>
            </td>
            <td style={{ ...styles.cell, ...styles.actions }}>
                <ButtonGeneric color="var(--primary)" onClickBtn={() => onEditar(pelicula)}>
                    Editar
                </ButtonGeneric>
                <ButtonGeneric color="var(--text-muted)" onClickBtn={handleCambiarEstado}>
                    {pelicula.estado ? "Desactivar" : "Activar"}
                </ButtonGeneric>
                <ButtonGeneric color="#dc2626" onClickBtn={handleEliminar}>
                    Eliminar
                </ButtonGeneric>
            </td>
        </tr>
    );
}

const styles: Record<string, CSSProperties> = {
    row: {
        borderBottom: "1px solid var(--surface-border)",
    },
    cell: {
        padding: "0.85rem 1rem",
        color: "var(--foreground)",
        fontSize: "0.9rem",
    },
    actions: {
        display: "flex",
        gap: "0.4rem",
        flexWrap: "wrap",
    },
    badgeActiva: {
        display: "inline-block",
        padding: "0.25rem 0.65rem",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 700,
        backgroundColor: "var(--success-light)",
        color: "var(--success)",
    },
    badgeInactiva: {
        display: "inline-block",
        padding: "0.25rem 0.65rem",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 700,
        backgroundColor: "var(--primary-light)",
        color: "var(--text-muted)",
    },
};