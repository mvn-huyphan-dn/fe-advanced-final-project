import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: {
    loading: true,
    tip: 'Loading...'
  },
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingTrue: (state, action) => {
      state.loading = {
        loading: true,
        tip: action.payload.tip
      }
    },
    setLoadingFalse: (state, action) => {
      state.loading = {
        loading: false,
      }
    }
  },
})
// Action creators are generated for each case reducer function
export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions

export default loadingSlice.reducer
