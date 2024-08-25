import { Link } from "react-router-dom";

const HeroSec = () => {
  const userType = localStorage.getItem("userType");
  return (
    <>
      <div
        className="hero h-[650px] bg-fixed"
        style={{
          backgroundImage:
            "url(https://t4.ftcdn.net/jpg/02/59/50/77/360_F_259507742_GfubalDmixiV25WEYpk39a0Wxs2ALKhS.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              "Welcome to Mango Valley – Where Freshness Meets Flavor"Discover
              the Taste of Freshness""Explore the World of Exquisite Mangoes"
            </p>
            {userType == "normal" ? (
              <button className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white">
                <Link to="/login">Get Started</Link>
              </button>
            ) : (
              <Link to="/dashboard">
                <button className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white">
                  Go To Your Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSec;
