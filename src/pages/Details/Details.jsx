import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../../styles/components/details.sass'
import duploLuxo from '../../assets/accommodations/Duplo-Luxo.jpg'
import standardCasal from '../../assets/accommodations/Standard-Casal.jpg'
import casalPremium from '../../assets/accommodations/Casal-Premium.jpg'

function Details() {
  const { id } = useParams()
  const [dataStorage, setData] = useState([])
  const [bookingData, setBookingData] = useState({})
  useEffect(() => {
    const localItem = JSON.parse(localStorage.getItem("bookingData"));
    if (localItem != null) {
      if (localItem.length != 0) {
        setData(localItem);
      }
    }
  }, [])

  function Booking(params) {
    const ident = '#' + id
    dataStorage.map((item, index) => {
      if (item.id == ident)
        setBookingData(item)
    })
  }

  useEffect(() => {
    Booking()
  })


  const img = {
    DuploLuxo: duploLuxo,
    StandardCasal: standardCasal,
    CasalPremium: casalPremium
  }



  return (
    <div className='details'>
      <div className='imgScreen'>
        <img src={bookingData.accommodation === 'DuploLuxo' ?
          duploLuxo :
          bookingData.accommodation === 'StandardCasal' ?
            standardCasal :
            casalPremium} alt="" />
      </div>
      <div className='informations'>
        <div className="booking">
          <div className='title'>Dados da reserva</div>
          <label htmlFor="">Acomodação</label>
          <h3>{bookingData.accommodation === 'DuploLuxo' ?
            "Duplo Luxo" :
            bookingData.accommodation === 'StandardCasal' ?
              "Standard Casal" :
              "Casal Premium"}</h3>
          <label htmlFor="">Check-in</label>
          <h3>{bookingData.checkIn}</h3>
          <label htmlFor="">Check-out</label>
          <h3>{bookingData.checkOut}</h3>
          <label htmlFor="">Hóspedes</label>
          <h3>{bookingData.guests}</h3>
        </div>
        <div className='person'>
          <div className='title'>Dados do Responsável</div>
          <label htmlFor="">Nome</label>
          <h3>{bookingData.name}</h3>
          <label htmlFor="">Sobrenome</label>
          <h3>{bookingData.surname}</h3>
          <label htmlFor="">Documento</label>
          <h3>{bookingData.document}</h3>
          <label htmlFor="">Data de Nascimento</label>
          <h3>{bookingData.date}</h3>
        </div>
        <div className='person2'>
          <div className='title'>Dados do Responsável</div>
          <label htmlFor="">Telefone</label>
          <h3>{bookingData.phone}</h3>
          <label htmlFor="">Email</label>
          <h3>{bookingData.email}</h3>
          <label htmlFor="">Sexo</label>
          <h3>{bookingData.sex}</h3>
          <label htmlFor="">Nacionalida</label>
          <h3>{bookingData.nationality}</h3>
        </div>
        <div className='city'>
          <div className='title'>Endereço</div>
          <label htmlFor="">CEP</label>
          <h3>{bookingData.cep}</h3>
          <label htmlFor="">Rua</label>
          <h3>{bookingData.road}</h3>
          <label htmlFor="">Bairro</label>
          <h3>{bookingData.neighborhood}</h3>
          <label htmlFor="">Número</label>
          <h3>{bookingData.number}</h3>
        </div>
        <div className='city2'>
          <div className='title'>Endereço</div>
          <label htmlFor="">Cidade</label>
          <h3>{bookingData.city}</h3>
          <label htmlFor="">Estado</label>
          <h3>{bookingData.state}</h3>
          <label htmlFor="">Complemento</label>
          <h3>{bookingData.complement}</h3>
          <label htmlFor="">Referência</label>
          <h3>{bookingData.reference}</h3>
        </div>

      </div>
    </div>

  )
}

export default Details