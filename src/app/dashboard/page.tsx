"use client"

import Link from "next/link";
import CardGeneric from "../components/CardGeneric"
import { useAppSelector } from "../redux/hook";
import "./style.css"
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import ButtonGeneric from "../components/ButtonGeneric";

export default function Dashboard() {
    const reservas = useAppSelector((state)=> state.reserva);
    const peliculas = useAppSelector((state)=> state.pelicula);

    const dataGrafica = peliculas.list.map((pelicula) => {
        const reservasDePelicula = reservas.list.filter(
            (reserva) => reserva.peliculaID === pelicula.id
        ).length;

        return {
            nombre: pelicula.nombre, 
            cantidad: reservasDePelicula
        };
    });

    return (
        
        <section className="layout-dashboard">
            
            <header className="dashboard-header">
                <h1>DASHBOARD</h1>
                <small>Ultima act: <i>23 / 7 / 2026 8:58 am</i></small>
            </header>
           <section className="dashboard-wrapper">
                <section className="kpi-grid">
                    <CardGeneric labelString="Total Peliculas">
                        <h3>{peliculas.list.length}</h3>
                    </CardGeneric>
                    <CardGeneric labelString="Entradas Vendidas Hoy">
                        <h3>{reservas.list.length}</h3>
                    </CardGeneric>
                    <CardGeneric labelString="Ingresos Generados">
                        <h3 style={{ color: "var(--success)" }}>${reservas.list.reduce((p, c) => {
                        return p + c.total;
                        }, 0).toFixed(0)}</h3>
                    </CardGeneric>
                    <CardGeneric labelString="Funciones Disponibles">
                        <h3>{peliculas.list.filter(p => p.estado).length}</h3>
                    </CardGeneric>
                    <Link href='/registrar-venta'>
                        <ButtonGeneric color = "var(--success)">
                            Registrar Nueva Venta
                        </ButtonGeneric>
                    </Link>
                </section>
                <section className="dashboard-body-grid">
                
               
                <article className="panel-card">
                    <h3 className="panel-title">Resumen de Reservas por Película</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataGrafica}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
                                <XAxis dataKey="nombre" angle={-25} textAnchor="end" height={80} stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip 
                                    cursor={{ fill: 'var(--primary-light)', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--surface-border)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="cantidad" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                
                <aside className="panel-card">
                    <h3 className="panel-title">Próximas Funciones</h3>
                    <div className="agenda-list">
                        {peliculas.list.map(pelicula => (
                            <div key={pelicula.id} className="agenda-item">
                                <p className="agenda-item-title">{pelicula.nombre}</p>
                                <div className="agenda-item-details">
                                    <span>{pelicula.duracion} min</span>
                                    <span className="agenda-item-time">{pelicula.horaInicio}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

            </section>
           </section>
           

            
            
        </section>
    )
}