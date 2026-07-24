import { CSSProperties } from "react";

interface BuscadorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Buscador({ value, onChange }: BuscadorProps) {
    return (
        <input
            type="text"
            placeholder="Buscar por nombre, género, clasificación o sala..."
            value={value}
            onChange={e => onChange(e.target.value)}
            style={styles.input}
        />
    );
}

const styles: Record<string, CSSProperties> = {
    input: {
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        border: "1px solid var(--surface-border)",
        backgroundColor: "var(--surface)",
        color: "var(--foreground)",
        fontSize: "0.95rem",
        fontFamily: "inherit",
        outline: "none",
        width: "100%",
        maxWidth: "420px",
    },
};