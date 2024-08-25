import { useLoaderData, useNavigate } from "react-router-dom";
import useMangoes from "../../CustomHook/useMangoes";
import { useEffect, useState } from "react";

const ManageOrders = () => {
  const orders = useLoaderData();
  const { mangoes } = useMangoes();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_baseUrl}/api/accounts/users/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const orderTitle = (mangoId) => {
    const mango = mangoes.find((mango) => mango.id === mangoId);
    return mango ? mango.title : "Unknown Mango";
  };

  const orderUser = (uid) => {
    const user = users.find((user) => user.id === uid);
    return user ? user.username : "guest user";
  };

  const handleSubmit = async (id, user, mango) => {
    const data = {
      status: "completed",
      user: user,
      mango: mango,
    };

    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${
          import.meta.env.VITE_baseUrl
        }/api/marketplaces/orders/${id}/update-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Order marked as complete successfully!");
        navigate("/dashboard/orders");
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to complete order");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <h1 className="mt-20 text-center">Manage All Orders</h1>
      <div className="overflow-x-auto mt-8 mb-14 mx-auto w-4/6 shadow-xl shadow-gray-700 border rounded">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th>Order for</th>
              <th>User</th>
              <th>Order date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{orderTitle(order.mango)}</td>
                <td>{orderUser(order.user)}</td>
                <td>{formatDate(order.order_date)}</td>
                <td>{order.status}</td>
                {order.status === "COMPLETED" ? (
                  <button className="btn btn-success btn-xs">Delivered</button>
                ) : (
                  <button
                    onClick={() =>
                      handleSubmit(order.id, order.user, order.mango)
                    }
                    className="btn btn-warning btn-sm"
                  >
                    mark as completed
                  </button>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageOrders;
