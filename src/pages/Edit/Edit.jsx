import React, { useState, useEffect, useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import schema from '../../validations/newBooking'
import location from '../../services/axios'
import { useParams } from 'react-router-dom';
import '../../styles/components/editBooking.sass'

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [count, setCount] = useState(0)
    const [dataEdit, setDataEdit] = useState([])
    const [inputCep, setInputCep] = useState('');
    const formRef = useRef(null)
    const localStorageData = JSON.parse(localStorage.getItem("bookingData"));
    var obj = {}
    function dataStorage() {
        let data = localStorageData.slice()
        let ident = '#' + id
        data.map((item, index) => {
            if (item.id == ident) {
                obj = item
            }
        })
    }
    dataStorage()
    const { register, handleSubmit, setValue, formState: { errors, dirtyFields } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // Defina os valores iniciais para todos os campos aqui
            accommodation: obj.accommodation,
            checkIn: obj.checkIn,
            checkOut: obj.checkOut,
            guests: obj.guests,
            name: obj.name,
            surname: obj.surname,
            document: obj.document,
            date: obj.date,
            phone: obj.phone,
            email: obj.email,
            sex: obj.sex,
            nationality: obj.nationality,
            cep: obj.cep,
            road: obj.road,
            neighborhood: obj.neighborhood,
            number: obj.number,
            city: obj.city,
            state: obj.state,
            complement: obj.complement,
            reference: obj.reference,
        },
    });

    useEffect(() => {
        // Marcar todos os campos como modificados
        Object.keys(dirtyFields).forEach((fieldName) => {
            setValue(fieldName, dirtyFields[fieldName], { shouldValidate: false });
        });
    }, [dirtyFields, setValue]);

    useEffect(() => {
        const localItem = JSON.parse(localStorage.getItem("bookingData"));
        if (localItem != null) {
            if (localItem.length != 0) {
                setDataEdit(localItem);
                setCount(localItem.length)
            }
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('bookingData', JSON.stringify(dataEdit));

    }, [dataEdit])

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

        } catch (error) {

        }
    }
    function onData(params) {
        let ident = '#' + id
        let updatedData = dataEdit.map((item) => {
            if (item.id === ident) {
                return { ...item, ...params };
            }
            return item;
        });
        console.log(updatedData)
        setDataEdit(updatedData);
        localStorage.setItem('bookingData', JSON.stringify(updatedData));
        formRef.current.reset();
        navigate(`/dashboard`);
    }
    return (
        <div className='editBooking'>
            <form ref={formRef} action="" onSubmit={handleSubmit(onData)}>
                <div className='dataBooking'>
                    <h2>Dados da reserva</h2>
                    <div className='row'>
                        <div className="input">
                            <label htmlFor="accommodation">Acomodação</label>
                            <select {...register('accommodation')} name="accommodation" id="accommodation">
                                <option value="">Selecione uma acomodação</option>
                                <option value="Duplo Luxo">Duplo Luxo</option>
                                <option value="Standard Casal">Standard Casal</option>
                                <option value="Casal Premium">Casal Premium</option>
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
                                <option value="">--</option>
                                <option value="BA">BA</option>
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
                        <input type="submit" value="Editar" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Edit