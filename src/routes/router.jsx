import { Routes, Route } from 'react-router-dom'
import  Dashboard  from '../pages/Dashboard/Dashboard'
import NewBooking  from '../pages/NewBooking/NewBooking'

import Initial from '../pages/Initial/Initial'

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path='/' element={<Initial/>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="newBooking" element={<NewBooking />} />
      </Route>
    </Routes>
  )
}