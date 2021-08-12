const mysql = require('mysql2');
const knex = require('../../conexao');

async function cadastrarUsuario(req, res){
    const {nome, email, senha} = req.body;

    if(!nome || !email || !senha){
      return res.status(400).json('Todos os campos são obrigatórios.');
    }

    try {
      const emailExiste = await knex('usuario').where({email});

      if(emailExiste.length > 0){
        return res.status(400).json('este E-mail já está cadastrado.');
      }

      const novoUsuario = {nome: nome, email:email, senha:senha}
      const usuarios = await knex('usuario').insert(novoUsuario);

      if(usuarios.length === 0){
        return res.status(400).json('Não foi possivel realizar o cadastro');
      }

      res.json('Cadastro realizado com sucesso!');
    } catch (error) {
      res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
}