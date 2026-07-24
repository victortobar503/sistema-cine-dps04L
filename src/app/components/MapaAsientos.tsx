"use client";
import React, { useState } from "react";
import {  useAppDispatch, useAppSelector } from "../redux/hook";
import ButtonGeneric from "./ButtonGeneric";
import { apartarAsiento, desapartar } from "../redux/slices/salasSlice";
import { Asiento } from "../types/asiento";

interface MapaAsientosProps {
    salaId: number;
    
    onConfirm: (asientosSeleccionados: string[]) => void; 
}

export default function MapaAsientos({ salaId, onConfirm }: MapaAsientosProps) {
    const dispatch = useAppDispatch();
    const salas = useAppSelector((state) => state.sala.list);
    const salaActual = salas.find((s) => s.id === salaId);

    if (!salaActual || !salaActual.asientos) {
        return <p>Cargando mapa de asientos...</p>;
    }

    const [seleccionados, setSeleccionados] = useState<string[]>(() => {
        return salaActual.asientos?.filter((asiento) =>asiento.ocupado &&( asiento.usuarioID === undefined || asiento.usuarioID === null)).map((asiento) => asiento.codigo) ?? [];
    });

    
    const handleAsientoClick = (asiento: Asiento) => {

        if (asiento.ocupado) {
            if(asiento.usuarioID)return
            dispatch(desapartar(asiento.id));
        } 

        setSeleccionados((prev) => {
            if (prev.includes(asiento.codigo)) {
               
                return prev.filter((codigo) => codigo !== asiento.codigo);
            } else {
                
                return [...prev, asiento.codigo];
            }
        });
        
    };

    return (
        <div style={styles.container}>
            {/* 1. LEYENDA INFORMATIVA */}
            <div style={styles.leyendaContainer}>
                <div style={styles.leyendaItem}>
                    <div style={{ ...styles.leyendaColor, backgroundColor: "var(--surface)", border: "2px solid var(--primary)" }}></div>
                    <span>Disponible</span>
                </div>
                <div style={styles.leyendaItem}>
                    <div style={{ ...styles.leyendaColor, backgroundColor: "var(--success)" }}></div>
                    <span>Seleccionado</span>
                </div>
                <div style={styles.leyendaItem}>
                    <div style={{ ...styles.leyendaColor, backgroundColor: "var(--surface-border)", opacity: 0.5 }}></div>
                    <span>Ocupado</span>
                </div>
            </div>

           
            <div style={styles.pantallaContainer}>
                <div style={styles.pantallaCurva}></div>
                <p style={styles.pantallaTexto}>PANTALLA</p>
            </div>

          
            <div style={styles.gridAsientos}>
                {salaActual.asientos.map((asiento) => {
                    
                    const isSeleccionado = seleccionados.includes(asiento.codigo);
                    
                    
                    let estiloAsiento = { ...styles.asientoBase };
                    
                    if (asiento.ocupado && asiento.usuarioID) {
                        estiloAsiento = { ...estiloAsiento, ...styles.asientoOcupado };
                    } else if (isSeleccionado) {
                        estiloAsiento = { ...estiloAsiento, ...styles.asientoSeleccionado };
                    } else {
                        estiloAsiento = { ...estiloAsiento, ...styles.asientoDisponible };
                    }

                    return (
                        <div
                            key={asiento.id}
                            style={estiloAsiento}
                            onClick={() => handleAsientoClick(asiento)}
                            title={`${asiento.codigo}`}
                        >
                           
                            <span style={styles.asientoTexto}>{asiento.codigo}</span>
                        </div>
                    );
                })}
            </div>

            {/* 4. RESUMEN Y ACCIÓN */}
            <div style={styles.resumenContainer}>
                <p>
                    Asientos seleccionados: <strong>{seleccionados.length}</strong>
                </p>
                <ButtonGeneric 
                    color="var(--success)" 
                    onClickBtn={() => {
                        seleccionados.forEach(asiento=>{
                            dispatch(apartarAsiento({
                                id: `SALA-${salaId}-${asiento}`,
                                codigo: asiento,
                                ocupado: true,
                                salaID: salaId
                            }))
                        })
                        return onConfirm && onConfirm(seleccionados)
                    }
                    }
                >
                    Confirmar Selección
                </ButtonGeneric>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "var(--surface)",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        maxWidth: "600px",
        width: "100%",
        margin: "0 auto",
    },
    leyendaContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "30px",
        width: "100%",
        flexWrap: "wrap",
    },
    leyendaItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        fontWeight: "bold",
    },
    leyendaColor: {
        width: "20px",
        height: "20px",
        borderRadius: "4px",
    },
    pantallaContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "40px",
    },
    pantallaCurva: {
        width: "100%",
        height: "15px",
        backgroundColor: "var(--primary-light)",
        borderTopLeftRadius: "50% 100%",
        borderTopRightRadius: "50% 100%",
        borderBottom: "2px solid var(--primary)",
        boxShadow: "0 -5px 15px rgba(79, 70, 229, 0.2)",
    },
    pantallaTexto: {
        margin: "10px 0 0 0",
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        letterSpacing: "4px",
        fontWeight: "bold",
    },
    gridAsientos: {
        display: "grid",
        // Como indicaste que son 4 columnas por sala, forzamos 4 columnas en el grid
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
        marginBottom: "30px",
    },
    asientoBase: {
        width: "55px",
        height: "55px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        userSelect: "none",
    },
    asientoDisponible: {
        backgroundColor: "var(--surface)",
        border: "2px solid var(--primary)",
        color: "var(--primary)",
    },
    asientoSeleccionado: {
        backgroundColor: "var(--success)",
        border: "2px solid var(--success)",
        color: "#ffffff",
        boxShadow: "0 4px 10px rgba(5, 150, 105, 0.4)",
        transform: "translateY(-3px)",
    },
    asientoOcupado: {
        backgroundColor: "var(--surface-border)",
        border: "2px solid var(--surface-border)",
        color: "var(--text-muted)",
        opacity: 0.5,
        cursor: "not-allowed",
    },
    asientoTexto: {
        fontSize: "0.75rem",
        fontWeight: "bold",
    },
    resumenContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid var(--surface-border)",
        paddingTop: "20px",
    },
};