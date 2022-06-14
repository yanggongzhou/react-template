import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';
import userReducer from './modules/user.module';
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
