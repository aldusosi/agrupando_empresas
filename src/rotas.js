const express = require('express');
const validaToken = require('./filtros/validaToken');
const cadastro = require('./controladores/usuarios/cadastro');
const logar = require('./controladores/usuarios/login');
const listarEmpresa = require('./controladores/usuarios/listarEmpresas');
const cadastrarEmpresa = require('./controladores/usuarios/cadastrarEmpresa');
const removerEmpresa = require('./controladores/usuarios/removerEmpresa');
const editarEmpresa = require('./controladores/usuarios/editarEmpresa');

const rotas = express();

//Rotas de usuario desprotegidas
rotas.post('/cadastro', cadastro.cadastrarUsuario );
rotas.post('/login', logar.loginDeUsuario);

//Rotas de usuario protegidas
rotas.use(validaToken);
rotas.get('/empresas', listarEmpresa.listarEmpresas);
rotas.post('/empresas', cadastrarEmpresa.cadastrarEmpresa);
rotas.delete('/empresas/:id', removerEmpresa.removerEmpresa);
rotas.put('/empresas/:id', editarEmpresa.editarEmpresa);



module.exports = rotas;