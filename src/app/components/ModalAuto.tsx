import React, { useEffect } from 'react';

// Definición de las props
interface AutoCloseModalProps {
  isOpen: boolean;          // Controla si el modal está visible
  onClose: () => void;      // Función que se ejecuta cuando el tiempo termina
  duration?: number;        // Tiempo en milisegundos antes de desaparecer (por defecto 3000ms)
  children: React.ReactNode; // El contenido del modal
}

export const AutoCloseModal: React.FC<AutoCloseModalProps> = ({
  isOpen,
  onClose,
  duration = 3000,
  children,
}) => {
  useEffect(() => {
    // Si el modal no está abierto, no hacemos nada
    if (!isOpen) return;

    // Configuramos el temporizador
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Función de limpieza: evita fugas de memoria si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  // Si no está abierto, no renderizamos nada en el DOM
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {children}
        <button onClick={onClose} style={styles.closeButton}>
          Cerrar ahora
        </button>
      </div>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '300px',
    textAlign: 'center',
    position: 'relative',
  },
  closeButton: {
    marginTop: '15px',
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
  }
};