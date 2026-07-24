"use client";

import { CSSProperties, useMemo, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import { Pelicula } from "@/app/types/pelicula";
import FormularioRegistroPelicula from "@/app/components/FormularioRegistroPelicula";
import TablaGestionPeliculas from "@/app/components/TablaGestionPeliculas";
import Buscador from "@/app/components/Buscador";
import Filtros, { FiltrosState } from "@/app/components/Filtros";

const filtrosIniciales: FiltrosState = {
    genero: "todos",
    clasificacion: "todas",
    salaID: 0,
    estado: "todas",
};

export default function PeliculasPage() {
    const peliculas = useAppSelector(state => state.pelicula.list);
    const salas = useAppSelector(state => state.sala.list);

    const [busqueda, setBusqueda] = useState("");
    const [filtros, setFiltros] = useState<FiltrosState>(filtrosIniciales);
    const [peliculaEditar, setPeliculaEditar] = useState<Pelicula | null>(null);

    const peliculasFiltradas = useMemo(() => {
        return peliculas.filter(p => {
            const sala = salas.find(s => s.id === p.salaID);

            const coincideBusqueda = busqueda.trim() === "" || [
                p.nombre,
                p.genero,
                p.clasificacion,
                sala?.nombre ?? "",
            ].some(campo => campo.toLowerCase().includes(busqueda.toLowerCase()));

            const coincideGenero = filtros.genero === "todos" || p.genero === filtros.genero;
            const coincideClasificacion = filtros.clasificacion === "todas" || p.clasificacion === filtros.clasificacion;
            const coincideSala = filtros.salaID === 0 || p.salaID === filtros.salaID;
            const coincideEstado =
                filtros.estado === "todas" ||
                (filtros.estado === "activa" && p.estado) ||
                (filtros.estado === "inactiva" && !p.estado);

            return coincideBusqueda && coincideGenero && coincideClasificacion && coincideSala && coincideEstado;
        });
    }, [peliculas, salas, busqueda, filtros]);

    return (
        <section style={styles.wrapper}>
            <div style={styles.headerGroup}>
                <h1 style={styles.title}>Gestión de Películas</h1>
                <small style={styles.subtitle}>Registra, edita y administra la cartelera</small>
            </div>

            <FormularioRegistroPelicula
                peliculaEditar={peliculaEditar}
                onFinalizar={() => setPeliculaEditar(null)}
            />

            <div style={styles.toolbar}>
                <Buscador value={busqueda} onChange={setBusqueda} />
                <Filtros filtros={filtros} onChange={setFiltros} />
            </div>

            <TablaGestionPeliculas peliculas={peliculasFiltradas} onEditar={setPeliculaEditar} />
        </section>
    );
}

const styles: Record<string, CSSProperties> = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "2rem",
    },
    headerGroup: {
        marginBottom: "0.5rem",
    },
    title: {
        margin: 0,
        fontSize: "2rem",
        color: "var(--foreground)",
    },
    subtitle: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
    },
    toolbar: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
};