import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export const useStore = () => {
  return useDispatch<AppDispatch>()
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
