import { Link, useNavigate } from "react-router-dom";
import img from '/images.png';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_baseUrl}/api/auth/logout/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        localStorage.removeItem("userType");
        localStorage.removeItem("username");
        navigate("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="navbar bg-gray-100/50 fixed top-0 z-10 mb-14">
      <div className="flex-none">
        <a className="btn btn-ghost text-xl text-[#000000]">
          <Link to={"/"}> Mango Valley</Link>
        </a>
      </div>

      <div className="flex-1 justify-center hidden sm:flex list-none">
        <li>
          <Link className="text-white p-5 hover:bg-black" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-white p-5 hover:bg-black border-l" to="/blogs">
            Our Services
          </Link>
        </li>
        <li>
          <Link
            className="text-white p-5 hover:bg-black border-l"
            to="/reviews"
          >
            Customer Reviews
          </Link>
        </li>
        <li>
          <Link
            className="text-white p-5 hover:bg-black border-l"
            to="/myPortfolio"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            className="text-white p-5 hover:bg-black border-l"
            to="/myPortfolio"
          >
            Contact Us
          </Link>
        </li>
      </div>

      {token !== null ? (
        <div className="flex-none mr-5">
          <div className="dropdown dropdown-hover dropdown-left">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={img} alt="User avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="" to="/profile">
                  <span>Profile</span>{" "}
                </Link>
              </li>
              {userType == "admin" ? (
                <li>
                  <Link className="" to="/dashboard">
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="" to="/order_history">
                    Order History
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 mr-5">
          <Link
            to="/signUp"
            className="btn bg-[#000000] lg:px-10 text-[#fdfefe]"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="btn btn-secondary lg:px-10 text-[#ffffff]"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
