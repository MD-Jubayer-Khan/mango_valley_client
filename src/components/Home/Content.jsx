import { useState } from "react";
import { Link } from "react-router-dom";
import useMangoes from "../../CustomHook/useMangoes";
import img from "../../assets/noPf.png";

const Content = () => {
  const { mangoes, loading, error } = useMangoes();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loader = loading ? Math.max(mangoes.length || 7, 7) : 0;

  const filteredMangoes =
    selectedCategory === "All"
      ? mangoes
      : mangoes.filter((mango) => mango.category === selectedCategory);

  if (loading || mangoes.length === 0)
    return (
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-items-center mt-16">
        {Array.from({ length: loader }).map((_, index) => (
          <div key={index} className="flex w-52 flex-col gap-4 mb-16">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>
    );

  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <>
      <div className="flex justify-center mt-16">
        <p className="mr-3 mt-3">Filter by category:</p>
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box flex">
          <li>
            <button
              onClick={() => setSelectedCategory("Fazlee")}
              className="btn btn-outline mr-4"
            >
              Fazlee
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("Langda")}
              className="btn btn-outline mr-4"
            >
              Langda
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("Gopalbogh")}
              className="btn btn-outline mr-4"
            >
              Gopalbogh
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("Himsagar")}
              className="btn btn-outline mr-4"
            >
              Himsagar
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("Rupali")}
              className="btn btn-outline"
            >
              Rupali
            </button>
          </li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-items-center mt-16">
        {filteredMangoes.map((mango) => (
          <div
            key={mango.id}
            className="card bg-base-200 w-96 shadow-2xl shadow-cyan-500/50 my-10"
          >
            <figure className="px-4 pt-2">
              <img
                src={mango.image}
                alt={mango.title}
                className="rounded-xl w-full h-[350px]"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{mango.title}</h2>
              <p>Category: {mango.category}</p>
              <p>Price: {mango.price}</p>
              <div className="card-actions">
                <Link
                  to={`mango/${mango.id}`}
                  className="btn  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-[#ffeafe]"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredMangoes.length === 0 && (
        <dir className="h-auto bg-gray-300">
          <img src={img} alt="" />
        </dir>
      )}
    </>
  );
};

export default Content;
