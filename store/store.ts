import { configureStore, type Middleware } from '@reduxjs/toolkit'

import authReducer from './auth/reducer'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
}

export const setupStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      persistanceLocalStorageMiddleware
    ])
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
