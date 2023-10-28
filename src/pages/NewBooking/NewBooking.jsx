import React, { useState, useEffect } from 'react'
import '../../styles/components/newbooking.sass'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import schema from '../../validations/newBooking'

function NewBooking() {

  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  
  useEffect(()=>{
    const localItem = JSON.parse(localStorage.getItem("bookingData"));
    if(localItem.length != 0){
      setFormData(localItem);
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(formData));
  }, [formData])

  function onData(params) {
    setFormData([...formData, { ...params, id: "#79845" + count }])
    setCount(count + 1)
  }

  return (
    <div className='newBooking'>
      <form action="" onSubmit={handleSubmit(onData)}>
        <div className='dataBooking'>
          <h2>Dados da reserva</h2>
          <div className='row'>
            <div className="input">
              <label htmlFor="accommodation">Acomodação</label>
              <select {...register('accommodation')} name="accommodation" id="accommodation">
                <option value="">Selecione uma acomodação</option>
                <option value="duplo luxo">Duplo Luxo</option>
              </select>
              <span>{errors.accommodation?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="check-in">Check-in</label>
              <input type="text" name='check-in' placeholder='DD/MM/AAAA' />

            </div>
            <div className="input">
              <label htmlFor="check-out">Check-out</label>
              <input type="text" name='check-out' placeholder='DD/MM/AAAA' />

            </div>
            <div className="input">
              <label htmlFor="guests">Hóspedes</label>
              <input type="text" name='guests' placeholder='01 Adultos - 02 Crianças' />

            </div>
          </div>
        </div>

        <div className='dataResponsible'>
          <h2>Dados do responsável</h2>
          <div className="row">
            <div className="input">
              <label htmlFor="name">Nome</label>
              <input type="text" name='name' placeholder='Nome' />
            </div>
            <div className="input">
              <label htmlFor="surname">Sobrenome</label>
              <input type="text" name='surname' placeholder='Sobrenome' />
            </div>
            <div className="input">
              <label htmlFor="document">Documento</label>
              <input type="text" name='document' placeholder='CPF/Passaporte' />
            </div>
            <div className="input">
              <label htmlFor="date">Data de Nascimento</label>
              <input type="text" name='date' placeholder='DD/MM/AAAA' />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <label htmlFor="phone">Telefone</label>
              <input type="text" name='phone' placeholder='(00) 0 0000-0000' />
            </div>
            <div className="input">
              <label htmlFor="email">E-mail</label>
              <input type="text" name='email' placeholder='Email' />
            </div>
            <div className="input">
              <label htmlFor="sex">Sexo</label>
              <input type="text" name='sex' placeholder='Sexo' />
            </div>
            <div className="input">
              <label htmlFor="nationality">Nacionalidade</label>
              <input type="text" name='nationality' placeholder='Nacionalidade' />
            </div>
          </div>
        </div>
        <div className='address'>
          <h2>Endereço</h2>
          <div className="row">
            <div className="input">
              <label htmlFor="cep">CEP</label>
              <input type="text" name='cep' placeholder='00000-000' />
            </div>
            <div className="input">
              <label htmlFor="road">Rua</label>
              <input type="text" name='road' placeholder='Rua' />
            </div>
            <div className="input">
              <label htmlFor="neighborhood">Bairro</label>
              <input type="text" name='neighborhood' placeholder='Bairro' />
            </div>
            <div className="input">
              <label htmlFor="number">Número</label>
              <input type="text" name='number' placeholder='Nº' />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <label htmlFor="city">Cidade</label>
              <input type="text" name='city' placeholder='Cidade' />
            </div>
            <div className="input">
              <label htmlFor="state">Estado</label>
              <select name="state" id="state">
                <option value="">--</option>
                <option value="BA">BA</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="complement">Complemento</label>
              <input type="text" name='complement' placeholder='Casa.., Rua..' />
            </div>
            <div className="input">
              <label htmlFor="reference">Referência</label>
              <input type="text" name='reference' placeholder='Próximo a...' />
            </div>
          </div>
        </div>
        <div className='btnSubmit'>
          <div className="row">
            <input type="submit" value="Fazer reserva" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewBooking