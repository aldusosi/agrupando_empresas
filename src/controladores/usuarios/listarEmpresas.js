const knex = require('../../conexao');

async function listarEmpresas(req, res){

    try {
        const empresas = await knex('empresa');

        if(empresas.length === 0){
            return res.status(404).json('Nenhuma empresa encontrada.')
        }

        res.json(empresas);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    listarEmpresas,
}