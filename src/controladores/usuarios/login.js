const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginSchema = require('../../validacoes/loginSchema');

async function loginDeUsuario(req, res){
    const { email, senha } = req.body;

    try {
        await loginSchema.validate(req.body);
        
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
        res.status(400).json(error.message);
    }
}

module.exports = loginDeUsuario;