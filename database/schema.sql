DROP DATABASE IF EXISTS origin_db;

CREATE DATABASE origin_db;

USE origin_db;

CREATE TABLE  orders(
id_order INTEGER AUTO_INCREMENT NOT NULL,
total DECIMAL(10,2) NULL,
payment BOOLEAN DEFAULT false NOT NULL,
delivery BOOLEAN DEFAULT false NOT NULL,
address VARCHAR(255) NULL,
PRIMARY KEY (id_order)
);

CREATE TABLE clients(
id_client INTEGER AUTO_INCREMENT NOT NULL,
taxPayerName VARCHAR(255) NULL,
user_password VARCHAR(50) NOT NULL,
street VARCHAR (100) NULL,
ext_number VARCHAR(100) NULL,
int_number VARCHAR(100) NULL,
neighborhood VARCHAR(100) NULL,
zipcode VARCHAR(10) NOT NULL,
city VARCHAR(50) NOT NULL,
state VARCHAR(50)NOT NULL,
tax_id VARCHAR(50) NULL,
contact_name VARCHAR(100) NOT NULL,
phone VARCHAR(30) NOT NULL,
PRIMARY KEY (id_client)
);

CREATE TABLE users (
id_user INTEGER AUTO_INCREMENT NOT NULL,
username VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
access_client BOOLEAN DEFAULT true,
access_staff BOOLEAN DEFAULT false,
PRIMARY KEY (id_user)
);

CREATE TABLE products (
id_product INTEGER(10) AUTO_INCREMENT NOT NULL,
productName VARCHAR(20) NOT NULL,
avaiable INTEGER NOT NULL,
packing VARCHAR(20) NOT NULL,
PRIMARY KEY (id_product)
);

CREATE TABLE beerRequest(
product1_amount INTEGER NOT NULL,
product2_amount INTEGER NOT NULL
)
