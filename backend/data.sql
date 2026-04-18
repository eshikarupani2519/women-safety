CREATE DATABASE women_safety;
use women_safety;
SHOW TABLES;

CREATE TABLE users(id int primary key auto_increment,name varchar(30),phone varchar(10),email varchar(30),device_token_hash varchar(255));
create table user_contacts(id int primary key auto_increment,user_id int,contact varchar(10),foreign key(user_id) references users(id));
select * from users;
drop table user_contacts;
drop table users;