import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import NewBooking from '../pages/NewBooking/NewBooking'
import Details from '../pages/Details/Details'
import Edit from '../pages/Edit/Edit'
import Initial from '../pages/Initial/Initial'
import { useNavigate } from 'react-router-dom';

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path='/' element={<Initial />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="newBooking" element={<NewBooking />} />
        <Route path='details/:id' element={<Details />} />
        <Route path='edit/:id' element={<Edit />} />
      </Route>
    </Routes>
  )
}