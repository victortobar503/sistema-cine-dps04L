"use client";

import React, { useState } from "react";
import { useAppSelector } from "../redux/hook";
import ButtonGeneric from "../components/ButtonGeneric";
import "./style.css";

export default function Ventas() {
    
    const reservas = useAppSelector((state) => state.reserva.list);
    const peliculas = useAppSelector((state) => state.pelicula.list);

    const [busqueda, setBusqueda] = useState("");
    const [reservaSeleccionada, setReservaSeleccionada] = useState<any>(null);

    const obtenerPelicula = (id: string) => peliculas.find((p) => p.id === id);

    const reservasFiltradas = reservas.filter(
        (r) =>
            r.nombreUsuario.toLowerCase().includes(busqueda.toLowerCase()) ||
            r.Id.toString().includes(busqueda)
    );

    return (
        <>
            <header className="dashboard-header">
                <h1>HISTORIAL DE VENTAS</h1>
            </header>
        <section className="ventas-layout">
            
            <div className="filtros-container">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="filtro-search"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla de Resultados (Reducida Visualmente) */}
            <div className="tabla-wrapper">
                <table className="tabla-ventas">
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Película</th>
                            <th>Monto Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservasFiltradas.map((reserva) => {
                            const pelicula = obtenerPelicula(reserva.peliculaID);
                            return (
                                
                                <tr 
                                    key={reserva.Id} 
                                    onClick={() => setReservaSeleccionada(reserva)}
                                    style={{ cursor: "pointer" }}
                                    title="Haz clic para ver más detalles"
                                >
                                    <td className="font-bold">
                                        {reserva.Id.toString().padStart(5, "0")}
                                    </td>
                                    <td>
                                        {reserva.fechaCompra}
                                    </td>
                                    <td className="flex-center gap-2">
                                        {reserva.nombreUsuario}
                                    </td>
                                    <td className="font-bold text-primary">
                                        {pelicula?.nombre || "Desconocida"}
                                    </td>
                                    <td className="font-bold">
                                        ${reserva.total.toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal de Detalle de Venta (Información Extendida) */}
            {reservaSeleccionada && (
                <div className="modal-overlay" onClick={() => setReservaSeleccionada(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>DETALLE DE VENTA</h3>
                            <button
                                className="modal-close"
                                onClick={() => setReservaSeleccionada(null)}
                            >
                                ✖
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="ticket-grid">
                                <div className="ticket-image">
                                    <span>🎬</span>
                                </div>
                                <div className="ticket-info">
                                    <div className="line-placeholder w-100">
                                        <strong>Venta:</strong> #{reservaSeleccionada.Id.toString().padStart(5, "0")}
                                    </div>
                                    <div className="line-placeholder w-100">
                                        <strong>Cliente:</strong> {reservaSeleccionada.nombreUsuario}
                                    </div>
                                    <div className="line-placeholder w-100">
                                        <strong>Película:</strong> {obtenerPelicula(reservaSeleccionada.peliculaID)?.nombre || "Desconocida"}
                                    </div>
                                    <div className="line-placeholder w-100">
                                        <strong>Fecha y Hora:</strong> {reservaSeleccionada.fechaCompra} ({reservaSeleccionada.horaInicio} - {reservaSeleccionada.horaFinalizacion})
                                    </div>
                                    <div className="line-placeholder w-100">
                                        <strong>Sala:</strong> Sala {obtenerPelicula(reservaSeleccionada.peliculaID)?.salaID}
                                    </div>
                                    <div className="line-placeholder w-100">
                                        <strong>Boletos ({reservaSeleccionada.asientos.length}):</strong> {reservaSeleccionada.asientos.join(", ")}
                                    </div>
                                    <div className="line-placeholder w-100">
                                        <strong>Estado:</strong> <span className="badge-success" style={{ padding: "2px 6px", fontSize: "0.7rem"}}>Completada</span>
                                    </div>
                                    <div className="line-placeholder w-100" style={{ marginTop: "10px", borderBottom: "none", fontSize: "1.1rem" }}>
                                        <strong>Total Pagado:</strong> <span className="text-primary font-bold">${reservaSeleccionada.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <ButtonGeneric color="var(--success)" width="100%">
                                REIMPRIMIR TICKET
                            </ButtonGeneric>
                        </div>
                    </div>
                </div>
            )}
        </section>
        </>
    );
}