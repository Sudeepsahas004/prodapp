const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "productsdb",
  password: "postgres",
  port: 5432,
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    await pool.query(
      "INSERT INTO products(name,price) VALUES($1,$2)",
      [name, price]
    );

    res.json({
      message: "Product Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Backend Running On Port 3000");
});