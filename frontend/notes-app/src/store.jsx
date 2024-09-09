import { configureStore } from '@reduxjs/toolkit'

// import the needed slices
import NoteSlicesReducer from './features/NoteSlices'
export default configureStore({
  reducer: {
    notes:NoteSlicesReducer
  }
})