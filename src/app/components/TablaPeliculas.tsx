"use client"
import React from "react";
import { useAppSelector } from "../redux/hook";
import CardGeneric from "./CardGeneric";
import { peliculas } from "@/store/peliculas";

interface TablaProp{
  onClick: (id:string) => void
}
//TODO: Agregar la fecha en el lateral derecho superior
export default function TablaPelicula({onClick}: TablaProp) {
  const peliculas = useAppSelector((state) => state.pelicula);

 

  return (
    <div style={styles.tablaPeliculas}>
      {peliculas.list.map((pelicula) => (
        <section
          key={pelicula.id}
          className="card-container-pelicula"
          onClick={()=>{ onClick(pelicula.id)}}
        >
          <div style={styles.peliculaCard}>
            {/* Clasificación arriba a la derecha */}

            <span style={styles.peliculaHora}>
              {pelicula.horaInicio}
            </span>
            <span style={styles.peliculaClasificacion}>
              {pelicula.clasificacion}
            </span>

            {/* Degradado */}
            <div style={styles.peliculaOverlay} />

            {/* Información inferior */}
            <div style={styles.peliculaInfo}>
              {/* Duración abajo a la izquierda */}
              <span style={styles.peliculaDuracion}>
                {pelicula.duracion} min
              </span>

              {/* Nombre abajo a la derecha */}
              <span style={styles.peliculaTitulo}>
                {pelicula.nombre}
              </span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );

  
}
 const styles: Record<string, React.CSSProperties> = {
    tablaPeliculas: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "24px",
      width: "100%",
    },

    peliculaCard: {
      position: "relative",
      width: "100%",
      height: "320px",
      backgroundImage:
        "url('/video.png')",
     backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "12px",
      overflow: "hidden",
      cursor: "pointer",
    },

    peliculaClasificacion: {
      position: "absolute",
      top: "12px",
      right: "12px",
      zIndex: 2,
      padding: "5px 9px",
      borderRadius: "6px",
      backgroundColor: "var(--primary)",
      color: "white",
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    peliculaHora: {
      position: "absolute",
      zIndex: 10,
      top: "5px",
      borderRadius: "6px",
      padding: "5px 9px",
      backgroundColor: "var(--primary)",
      color: "white",
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    peliculaOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.2) 55%, rgba(0, 0, 0, 0.9) 100%)",
    },

    peliculaInfo: {
      position: "absolute",
      bottom: 0,
      left: 0,
      zIndex: 2,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      width: "100%",
      padding: "16px",
      boxSizing: "border-box",
      color: "white",
    },

    peliculaDuracion: {
      fontSize: "0.85rem",
      fontWeight: 500,
    },

    peliculaTitulo: {
      maxWidth: "60%",
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "right",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };