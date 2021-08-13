require('dotenv').config();
const express = require('express');
const cors = require("cors");
const rotas = require('./rotas');

const servidor = express();
servidor.use(express.json());
servidor.use(rotas);
servidor.use(cors);

servidor.listen(3000);