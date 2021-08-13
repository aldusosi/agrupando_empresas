const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const cadastroUsuarioSchema = require('../../validacoes/cadastroUsuarioSchema');

async function cadastrarUsuario(req, res){
    const {nome, email, senha} = req.body;

    try {
      await cadastroUsuarioSchema.validate(req.body);
      
      const emailExiste = await knex('usuario').where({email});

      if(emailExiste.length > 0){
        return res.status(400).json('este E-mail já está cadastrado.');
      }

      const senhaCripto = await bcrypt.hash(senha, 10);
      const novoUsuario = {nome: nome, email:email, senha:senhaCripto}
      const usuarios = await knex('usuario').insert(novoUsuario);

      if(usuarios.length === 0){
        return res.status(400).json('Não foi possivel realizar o cadastro');
      }

      res.json('Cadastro realizado com sucesso!');
    } catch (error) {
      res.status(400).json(error.message);
    }
}

module.exports = cadastrarUsuario;