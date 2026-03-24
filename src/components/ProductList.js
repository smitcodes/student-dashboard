import React, { useState } from "react";

const ProductList = () => {
  const products = [
    { id: 1, name: "Laptop", price: 55000, stock: 10 },
    { id: 2, name: "Keyboard", price: 1200, stock: 0 },
    { id: 3, name: "Mouse", price: 600, stock: 8 }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    payment: "COD"
  });

  const [orders, setOrders] = useState([]);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    if (formData.name.length < 3) {
      alert("Name must be at least 3 characters");
      return false;
    }
    if (!formData.email.includes("@")) {
      alert("Invalid Email");
      return false;
    }
    if (formData.mobile.length !== 10) {
      alert("Mobile must be 10 digits");
      return false;
    }
    if (formData.address.length < 10) {
      alert("Address must be at least 10 characters");
      return false;
    }
    return true;
  };

  // Submit Order
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newOrder = {
      ...formData,
      product: selectedProduct.name
    };

    setOrders([...orders, newOrder]);

    alert("Order Placed Successfully ✅");

    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      address: "",
      payment: "COD"
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Inventory</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>

              <td className={product.stock > 0 ? "text-success" : "text-danger"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </td>

              <td>
                <button
                  className="btn btn-success"
                  disabled={product.stock === 0}
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Order: {selectedProduct.name}</h5>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control mb-2"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-2"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  className="form-control mb-2"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  className="form-control mb-2"
                  value={formData.address}
                  onChange={handleChange}
                />

                {/* Payment Mode */}
                <select
                  name="payment"
                  className="form-control mb-2"
                  value={formData.payment}
                  onChange={handleChange}
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>

                <button className="btn btn-primary">Place Order</button>

                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MINI DATABASE (Orders List) */}
      <h4 className="mt-5">Orders</h4>
      <ul className="list-group">
        {orders.map((order, index) => (
          <li key={index} className="list-group-item">
            {order.name} ordered <b>{order.product}</b> ({order.payment})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;