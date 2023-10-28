import * as yup from 'yup';

const schema  = yup.object({
    accommodation: yup.string().required('Selecione uma acomodação'),
    
})

export default schema;