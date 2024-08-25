import HeroSec from "./HeroSec";
import Business from "./Business";
import Timeline from "./Timeline";
import Content from "./Content";

const Home = () => {
  const userType = localStorage.getItem("userType");
  return (
    <div>
      <HeroSec />
      {userType !== "admin" ? (
        <>
          <Content />
          <Business />
          <Timeline />
        </>
      ) : (
        <div className="h-0">
        </div>
      )}
    </div>
  );
};

export default Home;
