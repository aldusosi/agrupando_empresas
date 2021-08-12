const knex = require('../../conexao');

async function removerEmpresa(req, res){
    const { id } = req.params;
    const  usuario_id  = req.usuario.id;

    try {
        const empresas = await knex('empresa').where({id, usuario_id});

        if(empresas.length === 0){
            return res.status(400).json('A empresa não foi encontrada.');
        }

        const queryParaRemover = await knex('empresa').where({ id }).del();

        if(queryParaRemover.length === 0){
            return res.status(400).json('Não foi possivel remover');
        }

        res.json('Empresa removida com sucesso!');
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    removerEmpresa,
}