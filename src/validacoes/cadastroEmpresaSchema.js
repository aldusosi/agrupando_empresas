const yup = require('./yup');

const cadastroEmpresaSchema = yup.object().shape({
    nome: yup.string().required(),
    cnpj: yup.string().required(),
    email: yup.string().email().required(),
});

module.exports = cadastroEmpresaSchema;