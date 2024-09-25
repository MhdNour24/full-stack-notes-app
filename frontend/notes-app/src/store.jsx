import { configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage";

// import the needed slices
import NoteSlicesReducer from './features/NoteSlices'

const persistConfig = { key: "root", storage, version: 1 };


const persistedReducer  = persistReducer(persistConfig, NoteSlicesReducer);



export default configureStore({
  reducer: {
    notes:persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


