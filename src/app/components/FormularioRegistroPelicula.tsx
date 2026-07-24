"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { agregarPelicula, modificarPelicula, clearError } from "@/app/redux/slices/peliculasSlice";
import { Pelicula } from "@/app/types/pelicula";
import ButtonGeneric from "./ButtonGeneric";

interface FormularioRegistroPeliculaProps {
    peliculaEditar: Pelicula | null;
    onFinalizar: () => void;
}

const initialForm = {
    id: "",
    nombre: "",
    genero: "",
    duracion: 0,
    clasificacion: "A" as Pelicula["clasificacion"],
    salaID: 0,
    horaInicio: "",
    precio: 0,
    estado: true,
};

export default function FormularioRegistroPelicula({ peliculaEditar, onFinalizar }: FormularioRegistroPeliculaProps) {
    const dispatch = useAppDispatch();
    const salas = useAppSelector(state => state.sala.list);
    const error = useAppSelector(state => state.pelicula.error);

    const [form, setForm] = useState(initialForm);
    const esEdicion = peliculaEditar !== null;
    const intentoEnviar = useRef(false);

    useEffect(() => {
        setForm(peliculaEditar ? peliculaEditar : initialForm);
        dispatch(clearError());
    }, [peliculaEditar, dispatch]);

    useEffect(() => {
        if (intentoEnviar.current) {
            intentoEnviar.current = false;
            if (error === null) {
                setForm(initialForm);
                onFinalizar();
            }
        }
    }, [error, onFinalizar]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "duracion" || name === "precio" || name === "salaID"
                ? Number(value)
                : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        intentoEnviar.current = true;

        if (esEdicion) {
            dispatch(modificarPelicula(form as Pelicula));
        } else {
            dispatch(agregarPelicula(form as Pelicula));
        }
    }

    function handleCancelar() {
        setForm(initialForm);
        dispatch(clearError());
        onFinalizar();
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>
                {esEdicion ? "Editar Película" : "Registrar Nueva Película"}
            </h3>

            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.grid}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="id">Código</label>
                        <input
                            id="id"
                            name="id"
                            style={styles.input}
                            value={form.id}
                            onChange={handleChange}
                            disabled={esEdicion}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            style={styles.input}
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="genero">Género</label>
                        <input
                            id="genero"
                            name="genero"
                            style={styles.input}
                            value={form.genero}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="duracion">Duración (min)</label>
                        <input
                            id="duracion"
                            type="number"
                            name="duracion"
                            style={styles.input}
                            value={form.duracion}
                            onChange={handleChange}
                            min={1}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="clasificacion">Clasificación</label>
                        <select
                            id="clasificacion"
                            name="clasificacion"
                            style={styles.input}
                            value={form.clasificacion}
                            onChange={handleChange}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="salaID">Sala</label>
                        <select
                            id="salaID"
                            name="salaID"
                            style={styles.input}
                            value={form.salaID}
                            onChange={handleChange}
                            required
                        >
                            <option value={0} disabled>Selecciona una sala</option>
                            {salas.map(sala => (
                                <option key={sala.id} value={sala.id}>{sala.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="horaInicio">Hora de inicio</label>
                        <input
                            id="horaInicio"
                            type="time"
                            name="horaInicio"
                            style={styles.input}
                            value={form.horaInicio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="precio">Precio ($)</label>
                        <input
                            id="precio"
                            type="number"
                            step="0.01"
                            name="precio"
                            style={styles.input}
                            value={form.precio}
                            onChange={handleChange}
                            min={0}
                            required
                        />
                    </div>
                </div>

                <div style={styles.actions}>
                    <ButtonGeneric color="var(--success)">
                        {esEdicion ? "Guardar Cambios" : "Registrar Película"}
                    </ButtonGeneric>
                    {esEdicion && (
                        <ButtonGeneric color="var(--text-muted)" onClickBtn={handleCancelar}>
                            Cancelar
                        </ButtonGeneric>
                    )}
                </div>
            </form>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    container: {
        backgroundColor: "var(--surface)",
        border: "1px solid var(--surface-border)",
        borderRadius: "12px",
        padding: "24px",
        width: "100%",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        color: "var(--foreground)",
    },
    title: {
        margin: "0 0 1rem 0",
        fontSize: "1.25rem",
        color: "var(--primary)",
        fontWeight: "bold",
    },
    error: {
        color: "#dc2626",
        fontWeight: 600,
        marginBottom: "1rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1rem",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
    },
    label: {
        fontSize: "0.85rem",
        fontWeight: "bold",
        color: "var(--foreground)",
    },
    input: {
        padding: "0.65rem 0.85rem",
        borderRadius: "8px",
        border: "1px solid var(--surface-border)",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontSize: "0.95rem",
        fontFamily: "inherit",
        outline: "none",
    },
    actions: {
        display: "flex",
        gap: "0.5rem",
        marginTop: "0.5rem",
    },
};