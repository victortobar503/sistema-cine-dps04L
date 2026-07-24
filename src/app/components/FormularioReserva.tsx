interface ReservaProp{
    asientosID: string[];
    salaID: string,
    peliculaID:string,
    onSubmit: (nombreUsuario: string, reservaID: string)=> void
}

export default  function FormularioReserva(){
    {/* <div style={styles.gridAsientos}>
                {salaActual.asientos.map((asiento) => {
                    const isSeleccionado = seleccionados.includes(asiento.id);
                    
                    // Lógica para aplicar el estilo correcto según el estado del asiento
                    let estiloAsiento = { ...styles.asientoBase };
                    
                    if (asiento.ocupado) {
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
                            onClick={() => handleAsientoClick(asiento.id, asiento.ocupado)}
                            title={`Fila ${asiento.fila} - Butaca ${asiento.butaca}`}
                        >
                           
                            <span style={styles.asientoTexto}>{asiento.id}</span>
                        </div>
                    );
                })}
            </div> */}
}