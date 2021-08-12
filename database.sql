
/*CREATE DATABASE agrupando_empresas;*/

DROP TABLE IF EXISTS usuario cascade;
CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome TEXT NOT NULL,
	email TEXT NOT NULL, 
	senha TEXT NOT NULL
);