import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllListings from "./AllListings";

const MangoListings = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("image", formData.image);
    form.append("quantity", formData.quantity);
    form.append("category", formData.category);

    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_baseUrl}/api/marketplaces/mangoes/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${authToken}`,
          },
          body: form,
        }
      );

      if (response.ok) {
        alert("Mango listing added successfully!");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to add mango listing");
      }
    } catch (error) {
      console.error("Error adding mango listing", error);
    }
  };

  return (
    <>
    <div className="min-h-screen shadow-2xl shadow-cyan-500/50 mt-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            className="card-body"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="textarea textarea-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                required
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered"
              >
                <option value="">Select a category</option>
                <option value="Fazlee">Fazlee</option>
                <option value="Langda">Langda</option>
                <option value="Gopalbogh">Gopalbogh</option>
                <option value="Himsagar">Himsagar</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                required
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="file-input file-input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white">
                Add Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      <div className="mt-16 w-11/12">
        <AllListings />
    </div>     
    </>
  );
};

export default MangoListings;
