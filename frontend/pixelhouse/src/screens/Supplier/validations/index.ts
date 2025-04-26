import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório."),
  cnpj: yup
    .string()
    .required("CNPJ é obrigatório.")
    .length(14, "CNPJ deve conter 14 digitos."),
  email: yup.string().email("E-mail inválido").required("Email é obrigatório."),
  street: yup.string().required("O campo Rua é obrigatório."),
  number: yup.string().required("O campo Número de endereço é obrigatório."),
  district: yup.string().required("O campo Bairro é obrigatório."),
  city: yup.string().required("O campo Cidade é obrigatório."),
  zipcode: yup
    .string()
    .required("CEP é obrigatório.")
    .length(8, "CEP deve conter 8 digitos."),
});
