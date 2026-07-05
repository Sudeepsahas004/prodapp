import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const getProducts = async () => {
    const response = await fetch("/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = async () => {
    await fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
      }),
    });

    setName("");
    setPrice("");

    getProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button
          onClick={addProduct}
          style={{ marginLeft: "10px" }}
        >
          Add Product
        </button>
      </div>

      <h2>Productssss</h2>

      {products.map((product) => (
        <div key={product.id}>
          <strong>{product.name}</strong> - ₹{product.price}
        </div>
      ))}
    </div>
  );
}

export default App;