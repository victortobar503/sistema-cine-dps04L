import React, { CSSProperties } from 'react';
import ButtonGeneric from './components/ButtonGeneric';
import Link from 'next/link';
import CardGeneric from './components/CardGeneric';



export default function Home() {
  return (
    <>
      <section style={styles.titleContainer} className='title-app-container'>
        <div style={styles.headerGroup}>
          <h1 style={styles.title}>
            CINE<b style={styles.stream}>STREAM</b>
          </h1>
          <small style={styles.subtitle}>Sistema de Gestión de CineStream</small>
        </div>
        <Link href='/registrar-venta'>
          <ButtonGeneric color = "var(--success)">
            Registrar Nueva Venta
          </ButtonGeneric>
        </Link>
        <div style={styles.cardLayout}>
          <p style={styles.sectionHeading}>Informe de hoy:</p>
          <section style={styles.cardContainer}>

            <CardGeneric labelString="Película más Vendida" colorBorder='#6366f1'>
              <p style={styles.cardValue}>El Atlántida</p>
            </CardGeneric>
            <CardGeneric labelString="Venta más grande">
              <p style={styles.cardValue}>$1,450.00</p>
            </CardGeneric>
            <CardGeneric labelString="Usuario favorito">
              <p style={styles.cardValue}>Carlos Mendoza</p>
            </CardGeneric>
            
          </section>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  stream: {
    color: 'var(--primary)',
  },
  headerGroup: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '4rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  titleContainer: {
    width: '100%',
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2rem',
  },
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '850px',
  },
  sectionHeading: {
    fontWeight: '700',
    fontSize: '1.1rem',
    marginBottom: '0.75rem',
    color: 'var(--foreground)',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap', 
  },
  cardValue: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--foreground)',
    margin: 0,
  },
};