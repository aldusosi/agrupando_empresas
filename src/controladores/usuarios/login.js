const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginDeUsuario(req, res){
    const { email, senha } = req.body;

    if(!email || !senha){
        return res.status(400).json('Email e senha são obrigatórios.')
    }

    try {
        const usuarios = await knex('usuario').where({email});

        if(usuarios.length === 0){
            return res.json('E-mail ou senha incorretos.');
        }

        const usuario = usuarios[0];

        const verificaSenha = await bcrypt.compare(senha, usuario.senha);

        if(!verificaSenha){
            return res.status(400).json('E-mail ou senha incorretos.');
        }

        const token = jwt.sign({id: usuario.id}, process.env.JWT_KEY);

        res.json({
            usuario:{
                id:usuario.id,
                nome:usuario.nome,
                email:usuario.email,
            },
            token:token,
        });
    } catch (error) {
        
    }
}

module.exports = {
    loginDeUsuario,
}