import * as yup from 'yup';

const schema  = yup.object({
    accommodation: yup.string().required('Preencha este campo.'),
    checkIn: yup.string().required('Preencha este campo.'),
    checkOut: yup.string().required('Preencha este campo.o'),
    guests: yup.string().required('Preencha este campo.'),
    name: yup.string().required('Preencha este campo.'),
    surname: yup.string().required('Preencha este campo.'),
    document: yup.string().required('Preencha este campo.'),
    date: yup.string().required('Preencha este campo.'),
    phone: yup.string().required('Preencha este campo.'),
    email: yup.string().email('Email inválido, ex:(email@gmail.com)').required('Preencha este campo.'),
    sex: yup.string().required('Preencha este campo.'),
    nationality: yup.string().required('Preencha este campo.'),
    cep: yup.string().required('Preencha este campo.'),
    road: yup.string().required('Preencha este campo.'),
    number: yup.string().required('Preencha este campo.'),
})

export default schema;