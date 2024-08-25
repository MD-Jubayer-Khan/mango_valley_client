import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const MangoDetails = () => {
  const navigate = useNavigate();
  const mango = useLoaderData();
  const { id, title, category, description, image, price, quantity } = mango;

  const [isOrdering, setIsOrdering] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async () => {
    setIsOrdering(true);
    setError(null);
    const userId = localStorage.getItem("uid");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_baseUrl}/api/marketplaces/orders/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: "PENDING",
            user: userId,
            mango: id,
          }),
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in.");
      }

      if (!response.ok) {
        throw new Error("Failed to place the order");
      }

      const result = await response.json();
      alert("Order placed successfully!");
      navigate(`/mango/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="card lg:card-side w-10/12 mx-auto my-32 bg-base-100 shadow-xl shadow-slate-600">
      <figure>
        <img className="h-full w-[400px]" src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Quantity: {quantity}</p>
        <p>Category: {category}</p>
        {error && <p className="text-red-600">{error}</p>}
        {quantity === 0 ? (
          <div className="card-actions">
            <button className="btn text-red-600">Out of stock</button>
          </div>
        ) : (
          <div className="card-actions">
            <button
              className="btn  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-[#ffeafe]"
              onClick={placeOrder}
              disabled={isOrdering}
            >
              {isOrdering ? "Placing order..." : "Place an order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangoDetails;
