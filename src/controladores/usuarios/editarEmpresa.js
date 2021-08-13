const knex = require('../../conexao');

async function editarEmpresa(req, res){
    const { id } = req.params;
    const usuario_id = req.usuario.id;
    const { nome, descricao, cep, data_inicio_atividade } = req.body;

    if(!nome && !descricao && !cep && !data_inicio_atividade){
        return res.status(400).json('Deve-se  preencher pelo menos um dos campos.')
    }

    try {
        const empresas = await knex('empresa').where({id, usuario_id});

        if(empresas.length === 0){
            return res.status(404).json('A empresa não foi encontrada.')
        }
        
        const queryParaAtualizacao = await knex('empresa')
        .where({id})
        .update({nome, descricao, cep, data_inicio_atividade});

        if(queryParaAtualizacao.length === 0){
            return res.status(400).json('Não foi possivel atualizar a empresa');
        }

        res.json('Empresa atualizada com sucesso!');
    } catch (error) {
        res.status(400).json(error.message);
    }
    
}

module.exports = {
    editarEmpresa,
}