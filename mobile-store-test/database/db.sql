CREATE DATABASE productsdb;

use productsdb;

CREATE TABLE users (
    cedula INT NOT NULL PRIMARY KEY
);

CREATE TABLE admin (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO `admin`(`username`, `password`) VALUES ('admin','admin');

CREATE TABLE marcas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    model VARCHAR(255) NOT NULL,
    capacity VARCHAR(200) NOT NULL,
    price INT NOT NULL,
    marca VARCHAR(100) NOT NULL,
    img TEXT,
    year INT
);

CREATE TABLE facturas(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    factura VARCHAR(255) NOT NULL,
    user_id INT,
    products_id INT,
    cantidad INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(cedula) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_products FOREIGN KEY (products_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
);


describe users;
describe facturas;
describe marcas;
describe admin;
describe product;

