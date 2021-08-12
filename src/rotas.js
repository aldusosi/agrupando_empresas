const express = require('express');
const cadastro = require('./controladores/usuarios/cadastro');
const logar = require('./controladores/usuarios/login');
const validaToken = require('./filtros/validaToken');

const rotas = express();

//Rotas de usuario
rotas.post('/cadastro', cadastro.cadastrarUsuario );
rotas.post('/login', logar.loginDeUsuario);

rotas.use(validaToken);

module.exports = rotas;