// providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store"; // Ajusta esta ruta a donde tengas configurado el store

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}