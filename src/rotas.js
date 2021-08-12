const express = require('express');
const cadastro = require('./controladores/usuarios/cadastro');
const logar = require('./controladores/usuarios/login');

const rotas = express();

rotas.post('/cadastro', cadastro.cadastrarUsuario );
rotas.post('/login', logar.loginDeUsuario);

module.exports = rotas;