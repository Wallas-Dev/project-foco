import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import schema from '../../validations/newBooking'
import location from '../../services/axios'
import '../../styles/components/newbooking.sass'

function NewBooking() {

  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const [inputCep, setInputCep] = useState('');

  useEffect(() => {
    const localItem = JSON.parse(localStorage.getItem("bookingData"));
    if (localItem != null) {
      if (localItem.length != 0) {
        setFormData(localItem);
      }
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(formData));
  }, [formData])

  useEffect(() => {
    getCep(inputCep)
    // console.log(inputCep);
  }, [inputCep])

  const getCepInput = (e) => {
    setInputCep(e.target.value);
  };

  async function getCep(textCep) {
    const cep = textCep; // Substitua pelo CEP que você deseja consultar
    try {
      const dadosCEP = await location(cep);
      console.log('Dados do CEP:', dadosCEP);
      let city = document.querySelector('input[name=city]');
      city.value = dadosCEP.localidade;
      let state = document.querySelector('select[name=state]');
      state.value = dadosCEP.uf
      let neighborhood = document.querySelector('input[name=neighborhood]');
      neighborhood.value = dadosCEP.bairro
      let road = document.querySelector('input[name=road]');
      road.value = dadosCEP.logradouro
      let complement = document.querySelector('input[name=complement]');
      complement.value = dadosCEP.complemento


      // Faça algo com os dados do CEP aqui
    } catch (error) {
      // Trate o erro aqui
      //console.error('Erro ao consultar CEP:', error);
    }
  }


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
                <option value="standard casal">Standard Casal</option>
                <option value="Casal Premium">Casal Premium</option>
              </select>
              <span>{errors.accommodation?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="check-in">Check-in</label>
              <input {...register('checkIn')} type="text" name='checkIn' placeholder='DD/MM/AAAA' />
              <span>{errors.checkIn?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="checkOut">Check-out</label>
              <input {...register('checkOut')} type="text" name='checkOut' placeholder='DD/MM/AAAA' />
              <span>{errors.checkOut?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="guests">Hóspedes</label>
              <input {...register('guests')} type="text" name='guests' placeholder='01 Adultos - 02 Crianças' />
              <span>{errors.guests?.message}</span>
            </div>
          </div>
        </div>

        <div className='dataResponsible'>
          <h2>Dados do responsável</h2>
          <div className="row">
            <div className="input">
              <label htmlFor="name">Nome</label>
              <input {...register('name')} type="text" name='name' placeholder='Nome' />
              <span>{errors.name?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="surname">Sobrenome</label>
              <input {...register('surname')} type="text" name='surname' placeholder='Sobrenome' />
              <span>{errors.surname?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="document">Documento</label>
              <input {...register('document')} type="text" name='document' placeholder='CPF/Passaporte' />
              <span>{errors.document?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="date">Data de Nascimento</label>
              <input {...register('date')} type="text" name='date' placeholder='DD/MM/AAAA' />
              <span>{errors.date?.message}</span>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <label htmlFor="phone">Telefone</label>
              <input {...register('phone')} type="text" name='phone' placeholder='(00) 0 0000-0000' />
              <span>{errors.phone?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="email">E-mail</label>
              <input {...register('email')} type="text" name='email' placeholder='Email' />
              <span>{errors.email?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="sex">Sexo</label>
              <input {...register('sex')} type="text" name='sex' placeholder='Sexo' />
              <span>{errors.sex?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="nationality">Nacionalidade</label>
              <input {...register('nationality')} type="text" name='nationality' placeholder='Nacionalidade' />
              <span>{errors.nationality?.message}</span>
            </div>
          </div>
        </div>
        <div className='address'>
          <h2>Endereço</h2>
          <div className="row">
            <div className="input">
              <label htmlFor="cep">CEP</label>
              <input {...register('cep')} onChange={getCepInput} type="text" name='cep' placeholder='00000-000' />
              <span>{errors.cep?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="road">Rua</label>
              <input {...register('road')} type="text" name='road' placeholder='Rua' />
              <span>{errors.road?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="neighborhood">Bairro</label>
              <input type="text" name='neighborhood' placeholder='Bairro' />
            </div>
            <div className="input">
              <label htmlFor="number">Número</label>
              <input {...register('number')} type="text" name='number' placeholder='Nº' />
              <span>{errors.number?.message}</span>
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