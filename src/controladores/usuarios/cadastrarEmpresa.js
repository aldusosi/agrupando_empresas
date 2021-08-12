const knex = require('../../conexao');
const axios = require('axios');

async function cadastrarEmpresa(req, res){
    const { cnpj } = req.body;

    if(!cnpj){
        return res.status(400).json('O Cnpj é indispensável para a realização do cadastro.');
    }

    try {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
            

            const empresa = {
                nome: await response.data.nome_fantasia,
                descricao: await response.data.cnae_fiscal_descricao,
                cep: await response.data.cep,
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
            return res.status(400).json('Erro ao cadastrar, o CNPJ não foi encontrado No Brasil API.');
        }
    
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarEmpresa
};