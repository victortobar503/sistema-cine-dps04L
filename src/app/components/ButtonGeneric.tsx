import React from "react";

interface ButtonProp {
  onClickBtn?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  width?: string;
  children: React.ReactNode;
}

export default function ButtonGeneric({ 
  children, 
  width, 
  color = "#4F46E5", 
  onClickBtn 
}: ButtonProp) {
  return (
    <button
      className="btn-generic"
      onClick={onClickBtn}
      style={{ 
        "--btn-color": color,
        width: width // Aplicamos el ancho dinámico aquí
      } as React.CSSProperties}
    >
      {children}
    </button>
  );
}