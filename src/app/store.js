import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employee/employeeSlice'
import loadingSlice from '../features/loading/loadingSlice'

export const store = configureStore({
  reducer: {
    employee: employeeSlice,
    loading: loadingSlice
  },
})
