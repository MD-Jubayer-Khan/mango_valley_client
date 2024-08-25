import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",    
    password1: "",
    password2: "",

  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);

    const formData = {
      "username": credentials.username,
      "email": credentials.email,
      "password1": credentials.password1,
      "password2": credentials.password2
    };
    console.log(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_baseUrl}/api/auth/registration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful! Please check your email to confirm your account.');
        localStorage.setItem("user", formData.username);
        navigate('/login');
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div className="hero bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:ml-24">
          <h1 className="text-5xl font-bold text-white">Sign Up now!</h1>
          <p className="py-6 text-white">
            Sign Up now and delve into the world of premium mangoes! By
            joining our community, you'll gain exclusive access to the
            freshest, juiciest mangoes sourced directly from orchards renowned
            for their exceptional quality.
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
                value={credentials.username}
                onChange={handleChange}
                placeholder="Username"
                className="input input-bordered appearance-none block w-full bg-base-100 text-gray-700 border border-gray-200 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered appearance-none block w-full bg-base-100 text-gray-700 border border-gray-200 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                required
                type="password"
                name="password1"
                value={credentials.password1}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered appearance-none block w-full bg-base-100 text-gray-700 border border-gray-200 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                required
                type="password"
                name="password2"
                value={credentials.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input input-bordered appearance-none block w-full bg-base-100 text-gray-700 border border-gray-200 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white">Sign Up</button>
            </div>
          </form>
          <p className="text-center mt-4 mb-8">
            Already have an account?{" "}
            <a className="btn btn-outline btn-secondary btn-xs rounded-full">
              <Link to={'/login'}>Login</Link>
              
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
