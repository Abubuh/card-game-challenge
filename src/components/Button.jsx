import { useNavigate } from "react-router-dom";

const Button = ({ loaded = true, children, route }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(route)}
      className={`text-lg transition-all duration-1400 bounce-hover ease-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:opacity-70 ${
        loaded ? "translate-y-0 opacity-100" : "translate-y-90 opacity-0"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
