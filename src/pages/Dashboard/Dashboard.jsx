import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/dashboard.sass'
import search from '../../assets/icons/search.svg'
import plus from '../../assets/icons/plus.svg'

function Dashboard() {
  return (
    <>
      <div className="topSide">
        <div className="screen">
          <div className='allBooking'>
            <h3>Todas as reservas</h3>
          </div>
          <div className='cart'>
            <h3>Carrinho</h3>
          </div>
        </div>
        <div className='search'>
          <input type="text" placeholder='Pesquisar' />
          <button><img src={search} alt="" /></button>
        </div>
        <div className='newReserve'>
          <img src={plus} alt="" />
          <Link onClick={() => selectNav('newReserve')} to="/newBooking">Nova reserva</Link>
        </div>
      </div>
      <div className='dashboard'></div >
    </>


  )
}

export default Dashboard