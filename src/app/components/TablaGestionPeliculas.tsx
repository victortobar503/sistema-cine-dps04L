import { CSSProperties } from "react";
import { Pelicula } from "@/app/types/pelicula";
import PeliculaFila from "./PeliculaFila";

interface TablaGestionPeliculasProps {
    peliculas: Pelicula[];
    onEditar: (pelicula: Pelicula) => void;
}

export default function TablaGestionPeliculas({ peliculas, onEditar }: TablaGestionPeliculasProps) {
    return (
        <div style={styles.container}>
            {peliculas.length === 0 ? (
                <p style={styles.vacio}>No se encontraron películas con los criterios seleccionados.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Código</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Género</th>
                            <th style={styles.th}>Duración</th>
                            <th style={styles.th}>Clasificación</th>
                            <th style={styles.th}>Sala</th>
                            <th style={styles.th}>Hora</th>
                            <th style={styles.th}>Precio</th>
                            <th style={styles.th}>Estado</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peliculas.map(pelicula => (
                            <PeliculaFila key={pelicula.id} pelicula={pelicula} onEditar={onEditar} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    container: {
        backgroundColor: "var(--surface)",
        border: "1px solid var(--surface-border)",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: "0.85rem 1rem",
        backgroundColor: "var(--primary-light)",
        color: "var(--primary)",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontWeight: 700,
    },
    vacio: {
        color: "var(--text-muted)",
        padding: "1rem",
    },
};