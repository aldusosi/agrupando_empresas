const jwt = require('jsonwebtoken');
const knex = require('../conexao');

async function validaToken (req, res, next){
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(400).json('O token não foi informado!');
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        const user = await knex('usuario').where('id', id);

        if (user.length === 0) {
            return res.status.json('Usuário não encontrado!');
        }

        const { senha, ...dadosUser } = user[0];
        req.usuario = dadosUser;

        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = validaToken ;