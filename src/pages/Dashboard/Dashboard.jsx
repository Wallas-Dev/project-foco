import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../../styles/components/dashboard.sass'
import search from '../../assets/icons/search.svg'
import plus from '../../assets/icons/plus.svg'
import duploLuxo from '../../assets/accommodations/Duplo-Luxo.jpg'

function Dashboard() {

  const navigate = useNavigate();

  const [dataStorage, setData] = useState([])
  useEffect(() => {
    const localItem = JSON.parse(localStorage.getItem("bookingData"));
    if (localItem != null) {
      if (localItem.length != 0) {
        setData(localItem);
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(dataStorage));
  }, [dataStorage])

  function actionBooking(e) {
    const parentElement = e.target.parentNode;
    const nextElement = parentElement.nextElementSibling;
    const option = document.querySelectorAll(".option")
    option.forEach(element => {
      if (nextElement == element) {
        if (element.classList.contains('active')) {
          element.classList.remove('active')
        } else {
          element.classList.add('active')
        }
      } else {
        element.classList.remove('active')
      }
    });
  }

  const onEdit = (params) => {
    const id = params.target.id.substring(1)
    console.log(id)
    navigate(`/edit/${id}`);
  };

  function onDelete(e) {
    let data = dataStorage.slice(); // Cria uma cópia independente de dataStorage
    const parentElement = (e.target.parentNode).parentNode;

    data.forEach((item, index) => {
      if (item.id === parentElement.id) {
        data.splice(index, 1);
      }
    });

    setData(data);
    console.log(data);
  }

  return (
    <>
      <div className="topSide">
        <div className="leftSide">
          <div className='allBooking'>
            <h3>Todas as reservas</h3>
          </div>
          <div className='cart'>
            <h3>Carrinho</h3>
          </div>
        </div>
        <div className="rightSide">
          <div className='search'>
            <input type="text" placeholder='Pesquisar' />
            <button><img src={search} alt="" /></button>
          </div>
          <div className='newReserve'>
            <img src={plus} alt="" />
            <Link onClick={() => selectNav('newReserve')} to="/newBooking">Nova reserva</Link>
          </div>
        </div>
      </div>
      <div className='dashboard'>

        {dataStorage.map((item, index) => (

          <div className="contentBooking">

            <div className="accommodation">
              <div className='headerAccommodation'>
                <h4 >Acomodação</h4>
              </div>
              <div className="contentAccomodation">
                <div className="imgRoom">
                  <img src={duploLuxo} alt="" />
                </div>
                <div className="infoAccommodation">
                  <h4 className='id'>{item.id}</h4>
                  <h4 className='room'>{item.accommodation}</h4>
                </div>
              </div>
            </div>
            <div className="guests">
              <div className='headerGuests'><h4 >Hóspedes</h4></div>
              <div className='contentGuest'>
                <div className='name'>
                  <h4>{item.name} {item.surname}</h4>
                </div>
                <div className="guest">
                  <h5>{item.guests}</h5>
                </div>
              </div>
            </div>
            <div className='checkIn'>
              <div className='headerCheckin'><h4>Check-in</h4></div>
              <div className="contentCheckin">
                <div className="date">
                  <h4>{item.checkIn}</h4>
                </div>
                <div className="hour">
                  <h5>11:30</h5>
                </div>
              </div>
            </div>
            <div className='checkOut'>
              <div className='headerCheckout'><h4>Check-out</h4></div>
              <div className="contentCheckout">
                <div className="date">
                  <h4>{item.checkOut}</h4>
                </div>
                <div className="hour">
                  <h5>11:30</h5>
                </div>
              </div>
            </div>
            <div className="acoes">
              <h3 onClick={actionBooking}>...</h3>
            </div>
            <div id={item.id} className='option'>
              <div className="edit">
                <h5 id={item.id} onClick={onEdit} className=''>Editar</h5>
              </div>
              <div className="delete">
                <h5 onClick={onDelete} >Deletar</h5>
              </div>
            </div>
          </div>
        ))}
      </div >
    </>
  )
}
export default Dashboard