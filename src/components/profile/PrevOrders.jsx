import React from "react";
import useMangoes from "../../CustomHook/useMangoes";

const PrevOrders = ({ order, date, title }) => {
  const { mangoes } = useMangoes();

  const orderImg = (mangoId) => {
    const mango = mangoes.find((mango) => mango.id === mangoId);
    return mango ? mango.image : "Unknown Mango";
  };

  const orderCat = (mangoId) => {
    const mango = mangoes.find((mango) => mango.id === mangoId);
    return mango ? mango.category : "Unknown Mango";
  };

  const orderPrice = (mangoId) => {
    const mango = mangoes.find((mango) => mango.id === mangoId);
    return mango ? mango.price : "Not available";
  };

  const orderDesc = (mangoId) => {
    const mango = mangoes.find((mango) => mango.id === mangoId);
    return mango ? mango.description : "Not available";
  };

  return (
    <>
        {order.status === "COMPLETED" && (
          <div
            key={order.id}
            className="card lg:card-side w-10/12 mx-auto my-32 bg-base-100 shadow-xl shadow-slate-600"
          >
            <figure>
              <img className="h-full w-[400px]" src={orderImg(order.mango)} alt={title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{title(order.mango)}</h2>
              <p>Category: {orderCat(order.mango)}</p>
              <p>Price: ${orderPrice(order.mango)}</p>
              <p>
                Ordered date:{" "}
                <span className="text-sm"> {date(order.order_date)}</span>
              </p>
              <p>
                Description:{" "}
                <span className="text-sm">{orderDesc(order.mango)}</span>
              </p>
              <p>Status: {" "} <span className="text-success"> {order.status}</span></p>
            </div>
          </div>
        )}
    </>
  );
};

export default PrevOrders;
