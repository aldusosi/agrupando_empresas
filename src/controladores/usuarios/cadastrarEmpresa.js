const knex = require('../../conexao');
const axios = require('axios');
const formatarCnpj = require('../../utilitarios/formatarCnpj');
const cadastroEmpresaSchema = require('../../validacoes/cadastroEmpresaSchema');

async function cadastrarEmpresa(req, res){
    const { id } = req.usuario;
    let { nome, cnpj, email} = req.body;
    cnpj = cnpj.length > 14 ? formatarCnpj(cnpj) : cnpj;

    try {
        await cadastroEmpresaSchema.validate(req.body);
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
            

            const empresa = {
                nome: nome,
                descricao: await response.data.cnae_fiscal_descricao,
                usuario_id: id,
                cep: await response.data.cep,
                email: email,
                telefone: await response.data.ddd_telefone_1,
                cnpj: await response.data.cnpj,
                data_inicio_atividade: await response.data.data_inicio_atividade,
            }

            const empresaASerVerificada = await response.data.cnpj;

            const verificarCondicaoDeCadastro = await knex('empresa').where('empresa.cnpj', empresaASerVerificada);

            if(verificarCondicaoDeCadastro.length > 0){
                return res.status(400).json('O cnpj informado já está cadastrado.');
            }

            const queryParaCadastraEmpresa = await knex('empresa').insert(empresa);

            if(queryParaCadastraEmpresa.length === 0){
                return res.status(400).json('Não foi possivel realizar o cadastro.');
            }

            res.json(empresa);
        } catch (error) {
            return res.status(400).json('Erro ao cadastrar. cnpj não foi encontrado no Brasil API.');
        }
    
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = cadastrarEmpresa;