import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user.module';
import commonReducer from './modules/common.module';

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
