import React, { useState, useEffect, useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import schema from '../../validations/newBooking'
import location from '../../services/axios'
import '../../styles/components/newbooking.sass'

function NewBooking() {

  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState([])
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const [inputCep, setInputCep] = useState('');
  const formRef = useRef(null)


  const setInitialValues = (data) => {
    console.log(data)
    setValue('road', data.road);
    setValue('neighborhood', data.neighborhood);
    setValue('city', data.city);
    setValue('state', data.state);
    setValue('complement', data.complement);

  };

  useEffect(() => {
    const localItem = JSON.parse(localStorage.getItem("bookingData"));
    if (localItem != null) {
      if (localItem.length != 0) {
        setFormData(localItem);
        setCount(localItem.length)
      }
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(formData));
  }, [formData])

  useEffect(() => {
    getCep(inputCep)
  }, [inputCep])

  const getCepInput = (e) => {
    setInputCep(e.target.value);
  };

  async function getCep(textCep) {
    const cep = textCep; // Substitua pelo CEP que você deseja consultar
    try {
      const dadosCEP = await location(cep);
      const obj = {
        city: dadosCEP.localidade,
        state: dadosCEP.uf,
        neighborhood: dadosCEP.bairro,
        road: dadosCEP.logradouro,
        complement: dadosCEP.complemento
      };
      setInitialValues(obj);

    } catch (error) {

    }
  }

  function onData(params) {
    setFormData([...formData, { ...params, id: "#79845" + count }])
    setCount(count + 1)
    formRef.current.reset();
    
  }

  return (
    <div className='newBooking'>
      <form ref={formRef} action="" onSubmit={handleSubmit(onData)}>
        <div className='dataBooking'>
          <h2>Dados da reserva</h2>
          <div className='row'>
            <div className="input">
              <label htmlFor="accommodation">Acomodação</label>
              <select {...register('accommodation')} name="accommodation" id="accommodation">
                <option value="">Selecione uma acomodação</option>
                <option value="DuploLuxo">Duplo Luxo</option>
                <option value="StandardCasal">Standard Casal</option>
                <option value="CasalPremium">Casal Premium</option>
              </select>
              <span>{errors.accommodation?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="check-in">Check-in</label>
              <input {...register('checkIn')} type="text" name='checkIn' placeholder='02/02/2022 19:30' />
              <span>{errors.checkIn?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="checkOut">Check-out</label>
              <input {...register('checkOut')} type="text" name='checkOut' placeholder='05/02/2022 19:30' />
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
              <input {...register('name')} type="text" name='name' placeholder='João' />
              <span>{errors.name?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="surname">Sobrenome</label>
              <input {...register('surname')} type="text" name='surname' placeholder='Souza' />
              <span>{errors.surname?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="document">Documento</label>
              <input {...register('document')} type="text" name='document' placeholder='CPF/Passaporte' />
              <span>{errors.document?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="date">Data de Nascimento</label>
              <input {...register('date')} type="text" name='date' placeholder='14/12/1994' />
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
              <input {...register('email')} type="text" name='email' placeholder='nome@email.com' />
              <span>{errors.email?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="sex">Sexo</label>
              <input {...register('sex')} type="text" name='sex' placeholder='Masculino' />
              <span>{errors.sex?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="nationality">Nacionalidade</label>
              <input {...register('nationality')} type="text" name='nationality' placeholder='Brasileira' />
              <span>{errors.nationality?.message}</span>
            </div>
          </div>
        </div>
        <div className='address'>
          <h2>Endereço</h2>
          <div className="row">
            <div className="input">
              <label htmlFor="cep">CEP</label>
              <input {...register('cep')} onChange={getCepInput} type="text" name='cep' placeholder='46400-000' />
              <span>{errors.cep?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="road">Rua</label>
              <input {...register('road')} type="text" name='road' placeholder='Av. Santana' />
              <span>{errors.road?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="neighborhood">Bairro</label>
              <input {...register('neighborhood')} onChange={getCepInput} type="text" name='neighborhood' placeholder='Centro' />
              <span>{errors.neighborhood?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="number">Número</label>
              <input {...register('number')} type="text" name='number' placeholder='680' />
              <span>{errors.number?.message}</span>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <label htmlFor="city">Cidade</label>
              <input {...register('city')} onChange={getCepInput} type="text" name='city' placeholder='Caetite' />
              <span>{errors.city?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="state">Estado</label>
              <select {...register('state')} onChange={getCepInput} name="state" id="state">
                <option value="">-- Selecione um estado --</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>

              <span>{errors.state?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="complement">Complemento</label>
              <input {...register('complement')} type="text" name='complement' placeholder='Casa' />
              <span>{errors.complement?.message}</span>
            </div>
            <div className="input">
              <label htmlFor="reference">Referência</label>
              <input {...register('reference')} type="text" name='reference' placeholder='Próximo a clínica' />
              <span>{errors.reference?.message}</span>
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