import { lazy } from 'react'
import Dashboard from './Dashboard';

const NotFound = lazy(() => import('./NotFound'));
const Employees = lazy(() => import('./Employees'));
const AddEmployee = lazy(() => import('./AddEmployee'));
const EditEmployee = lazy(() => import('./EditEmployee'));
const EmployeeDetail = lazy(() => import('./EmployeeDetail'));


export {
  NotFound,
  Employees,
  Dashboard,
  AddEmployee,
  EditEmployee,
  EmployeeDetail
}
