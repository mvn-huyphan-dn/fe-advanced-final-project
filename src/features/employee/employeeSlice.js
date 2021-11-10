import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';
import { dateFormat } from '../../core/constants';
import { randomId } from '../../utils'

const initialState = {
  employeeList: [],
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeList: (state) => {
      state.employeeList = JSON.parse(localStorage.getItem('employee'));
    },
    addEmployee: (state, action) => {
      action.payload.id = randomId()
      action.payload.createdAt = dayjs().format(dateFormat)
      action.payload.updatedAt = dayjs().format(dateFormat)
      state.employeeList.push(action.payload)
      localStorage.setItem('employee', JSON.stringify(state.employeeList))
    },
    deleteEmployee: (state, action) => {
      state.employeeList = state.employeeList.filter(e => e.id !== action.payload)
      localStorage.setItem('employee', JSON.stringify(state.employeeList))
    },
    deleteMultipleEmployees: (state, action) => {
      state.employeeList = state.employeeList.filter(e => !action.payload.includes(e.id))
      localStorage.setItem('employee', JSON.stringify(state.employeeList))
    },
    editEmployee: (state, action) => {
      action.payload.updatedAt = dayjs().format(dateFormat)
      const index = state.employeeList.findIndex(e => e.id === action.payload.id)
      if (index !== -1) state.employeeList[index] = action.payload
      localStorage.setItem('employee', JSON.stringify(state.employeeList))
    },
  },
})
// Action creators are generated for each case reducer function
export const {
  addEmployee,
  getEmployeeList,
  deleteEmployee,
  deleteMultipleEmployees,
  editEmployee } = employeeSlice.actions

export default employeeSlice.reducer

