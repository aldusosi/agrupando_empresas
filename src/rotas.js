const express = require('express');
const cadastro = require('./controladores/usuarios/cadastro');
const logar = require('./controladores/usuarios/login');
const validaToken = require('./filtros/validaToken');

const rotas = express();

rotas.post('/cadastro', cadastro.cadastrarUsuario );
rotas.use(validaToken);
rotas.post('/login', logar.loginDeUsuario);

module.exports = rotas;