const express = require('express');
const usuarios = require('./controladores/usuarios/cadastro');

const rotas = express();

rotas.post('/cadastro', usuarios.cadastrarUsuario );

module.exports = rotas;