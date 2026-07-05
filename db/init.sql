CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INT
);

INSERT INTO products(name, price)
VALUES ('Laptop', 50000);