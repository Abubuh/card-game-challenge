import { useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";
import Button from "../components/Button";

const StartScreen = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col justify-center items-center gap-8 ">
      <img
        src={logo}
        className={`w-40 md:w-64 transition-all duration-1400 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "-translate-y-150 opacity-0"
        }`}
        alt="logo"
      />
      <Button loaded={loaded} route="/game">
        Start!
      </Button>
    </div>
  );
};

export default StartScreen;
