import * as Yup from 'yup';

// Valores iniciais do formik usados para estruturação
const initialValues = {
  bookday: null,
  hour: String,
  name: String,
  birthday: null,
};

// Schema para validação utilizando a biblioteca Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Campo Obrigatório').min(2, 'Mínimo 2 caracteres').max(64, 'Limite de caracteres excedido'),
  // ------Trocar number por date depois da implementação do date picker--------
  bookday: Yup.date().required('Campo Obrigatório').nullable,
  birthday: Yup.date().required('Campo Obrigatório').nullable,
  hour: Yup.string().required('Campo Obrigatório'),
});

export { validationSchema, initialValues };
