import { CSSProperties } from "react";
import { useAppSelector } from "@/app/redux/hook";
import ButtonGeneric from "./ButtonGeneric";

export interface FiltrosState {
    genero: string;
    clasificacion: string;
    salaID: number;
    estado: string; // "todas" | "activa" | "inactiva"
}

interface FiltrosProps {
    filtros: FiltrosState;
    onChange: (filtros: FiltrosState) => void;
}

export default function Filtros({ filtros, onChange }: FiltrosProps) {
    const peliculas = useAppSelector(state => state.pelicula.list);
    const salas = useAppSelector(state => state.sala.list);

    const generos = Array.from(new Set(peliculas.map(p => p.genero))).sort();
    const clasificaciones = Array.from(new Set(peliculas.map(p => p.clasificacion))).sort();

    function actualizar<K extends keyof FiltrosState>(campo: K, valor: FiltrosState[K]) {
        onChange({ ...filtros, [campo]: valor });
    }

    function limpiarFiltros() {
        onChange({ genero: "todos", clasificacion: "todas", salaID: 0, estado: "todas" });
    }

    return (
        <div style={styles.container}>
            <select style={styles.select} value={filtros.genero} onChange={e => actualizar("genero", e.target.value)}>
                <option value="todos">Todos los géneros</option>
                {generos.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <select style={styles.select} value={filtros.clasificacion} onChange={e => actualizar("clasificacion", e.target.value)}>
                <option value="todas">Todas las clasificaciones</option>
                {clasificaciones.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select style={styles.select} value={filtros.salaID} onChange={e => actualizar("salaID", Number(e.target.value))}>
                <option value={0}>Todas las salas</option>
                {salas.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>

            <select style={styles.select} value={filtros.estado} onChange={e => actualizar("estado", e.target.value)}>
                <option value="todas">Todos los estados</option>
                <option value="activa">Activas</option>
                <option value="inactiva">Inactivas</option>
            </select>

            <ButtonGeneric color="var(--text-muted)" onClickBtn={limpiarFiltros}>
                Limpiar filtros
            </ButtonGeneric>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    container: {
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
    },
    select: {
        padding: "0.6rem 0.85rem",
        borderRadius: "8px",
        border: "1px solid var(--surface-border)",
        backgroundColor: "var(--surface)",
        color: "var(--foreground)",
        fontSize: "0.9rem",
        fontFamily: "inherit",
        outline: "none",
    },
};