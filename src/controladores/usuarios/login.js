const knex = require('../../conexao');

async function loginDeUsuario(req, res){
    const { email, senha } = req.body;

    if(!email || !senha){
        return res.status(400).json('Email e senha são obrigatórios.')
    }

    try {
        const usuarios = await knex('usuario').where({email});

        if(usuarios.length === 0){
            return res.json('E-mail ou senha incorretos.')
        }

        const token = jwt.sign({id: usuarios.id}, process.env.JWT_KEY);

        res.json({
            usuario:{
                id: usuarios.id,
                nome: usuarios.nome,
                email: usuarios.email,
            },
            token: token,
        });
    } catch (error) {
        
    }
}

module.exports = {
    loginDeUsuario,
}