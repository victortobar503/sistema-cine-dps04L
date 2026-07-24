import React from "react";


interface CardGenericProp {
  onClickBtn?: React.MouseEventHandler<HTMLButtonElement>;
  colorBackground?: string;
  colorBorder?: string;
  colorBorderLeft?: string;
  labelString?: string | null;
  textColorLabel?: string;
  children: React.ReactNode;
}
//Para darle CSS dinamico se le hace de esta manera 
export default function CardGeneric({
  children,
  colorBackground = "var(--surface)",
  colorBorder = "var(--surface-border)",
  colorBorderLeft = "var(--primary)",
  textColorLabel = "var(--text-muted)",
  labelString = null,
  onClickBtn,
}: CardGenericProp) {
  return (
    <section
      className="card"
      onClick={onClickBtn}
      style={
        {
          "--card-background": colorBackground,
          "--card-border": colorBorder,
          "--card-border-left": colorBorderLeft,
          "--card-label-color": textColorLabel,
        } as React.CSSProperties
      }
    >
      {labelString && (
        <span className="cardLabel">
          {labelString}
        </span>
      )}

      {children}
    </section>
  );
}