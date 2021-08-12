
/*CREATE DATABASE agrupando_empresas;*/

DROP TABLE IF EXISTS usuario cascade;
CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome TEXT NOT NULL,
	email TEXT NOT NULL, 
	senha TEXT NOT NULL
);

DROP TABLE IF EXISTS empresa cascade;
CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome TEXT NOT NULL,
	descricao TEXT,
	cep INT NOT NULL,
	cnpj TEXT NOT NULL,
	data_inicio_atividade TEXT NOT NULL
);