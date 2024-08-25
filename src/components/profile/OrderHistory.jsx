import { useLoaderData } from "react-router-dom";
import useMangoes from "../../CustomHook/useMangoes";
import PrevOrders from "./PrevOrders";
import { useState } from "react";

const OrderHistory = () => {
  const orders = useLoaderData();
  const { mangoes } = useMangoes();
  const [isClicked, setIsClicked] = useState(false);

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

  return (
    <>
      <h1 className="mt-24 text-center text-4xl text-white">
        All Of Your Orders
      </h1>
      <div className="overflow-x-auto mt-8 mb-14 mx-auto w-4/6 shadow-xl shadow-gray-700 border rounded">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th>Order for</th>
              <th>Order date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{orderTitle(order.mango)}</td>
                <td>{formatDate(order.order_date)}</td>
                <td className={ order.status === 'COMPLETED' ? "text-success" : "text-error"}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isClicked ? (
        <>
          <button
            className="m-10 btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-[#ffeafe]"
            onClick={() => setIsClicked(false)}
          >
            Hide Previous Orders
          </button>
          {orders.map((order) => (
             <PrevOrders key={order.id} order={order} date={formatDate} title={orderTitle}/>
          ))}
         
        </>
      ) : (
        <button
          className="m-10 btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white"
          onClick={() => setIsClicked(true)}
        >
          Show Previous Orders Only
        </button>
      )}
    </>
  );
};

export default OrderHistory;
