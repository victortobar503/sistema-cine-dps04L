import { configureStore } from "@reduxjs/toolkit";
import peliculasSlice from "./slices/peliculasSlice";
import salasSlice from "./slices/salasSlice";
import reservaSlice from "./slices/reservasSlice";

export const store = configureStore({
  reducer: {
    pelicula: peliculasSlice,
    sala: salasSlice,
    reserva: reservaSlice
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;

export default store;


