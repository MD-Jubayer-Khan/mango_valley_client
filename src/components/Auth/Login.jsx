import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: credentials.username,
      password: credentials.password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_baseUrl}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.key) {
          localStorage.setItem("token", data.key);
          navigate("/profile");
        } else {
          console.error("Token is missing in the response data");
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <>
      <div className="hero bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ml-24">
            <h1 className="text-5xl font-bold text-[#fff]">Login now!</h1>
            <p className="py-6 text-[#fff]">
              Login now and delve into the world of premium mangoes! By joining
              our community, you'll gain exclusive access to the freshest,
              juiciest mangoes sourced directly from orchards renowned for their
              exceptional quality.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  placeholder="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-base-100 text-gray-700 border border-pink-100 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-base-100 text-gray-700 border border-pink-100 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white">Login</button>
              </div>
              <p>
                New in Mango Valley?{" "}
                <Link
                  to="/SignUp"
                  className="btn btn-outline btn-secondary btn-xs rounded-full"
                >
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
