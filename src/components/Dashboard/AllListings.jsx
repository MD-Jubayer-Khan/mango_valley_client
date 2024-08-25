import React from "react";
import useMangoes from "../../CustomHook/useMangoes";

const AllListings = () => {
  const { mangoes, loading, error } = useMangoes();
  if (loading)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mangoes.map((mango) => (
              <tr key={mango.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={mango.image} alt={mango.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold"> {mango.title} </div>
                    </div>
                  </div>
                </td>
                <td>{mango.category}</td>
                <td> {mango.price} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllListings;
