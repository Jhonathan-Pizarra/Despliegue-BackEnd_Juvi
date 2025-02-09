use juviexpress_bdd;

create table users(
	id bigint PRIMARY KEY Auto_increment,
    email varchar(180) not null unique,
    name varchar(90) not null,
    lastname varchar(90) not null,
    notification_token varchar(255),
    phone varchar(20) not null unique,
    image varchar(255) null,
    password varchar(90) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);


create table roles(
	id bigint PRIMARY KEY Auto_increment,
    name varchar(90) not null unique,
    image varchar(255) null,
    route  varchar(180) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

insert into roles(name, route, created_at, updated_at) 
values('Administrador', '/admin/home','2024-12-31', '2025-01-01');
/*values('Administrador', '/admin/orders/list','2024-08-28', '2024-08-28');*/

insert into roles(name, route, created_at, updated_at) 
values('Repartidor', '/delivery/home','2024-12-31', '2025-01-01');
/*values('Repartidor', '/delivery/orders/list','2024-08-28', '2024-08-28');*/

insert into roles(name, route, created_at, updated_at) 
values('Cliente', '/client/home','2024-12-31', '2025-01-01');
/*values('Cliente', '/client/products/list','2024-08-28', '2024-08-28');*/

/*
create table user_has_roles(
	id_user bigint not null,
    id_rol bigint not null,
	created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_user) references users(id) on update cascade on delete cascade,
	foreign key(id_rol) references roles(id) on update cascade on delete cascade,
    PRIMARY KEY(id_user, id_rol)
);
*/

create table user_has_roles(
	id_user bigint not null,
    id_rol bigint not null,
	created_at timestamp(0) not null default CURRENT_TIMESTAMP,
    updated_at timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    foreign key(id_user) references users(id) on update cascade on delete cascade,
	foreign key(id_rol) references roles(id) on update cascade on delete cascade,
    PRIMARY KEY(id_user, id_rol)
);


    
create table categories(
	id bigint PRIMARY KEY Auto_increment,
    name varchar(180) not null,
    description TEXT not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

CREATE TABLE products(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    image1 VARCHAR(255) NULL,
    image2 VARCHAR(255) NULL,
    image3 VARCHAR(255) NULL,
    id_category BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE address(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(180) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    id_user BIGINT NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE orders(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_client BIGINT NOT NULL,
    id_delivery BIGINT NULL,
    id_address BIGINT NOT NULL,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    status VARCHAR(90) NOT NULL,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    image varchar(255) null,
    FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_delivery) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
); 

CREATE TABLE order_has_products(
	id_order BIGINT NOT NULL,
    id_product BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    PRIMARY KEY(id_order, id_product),
    FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);