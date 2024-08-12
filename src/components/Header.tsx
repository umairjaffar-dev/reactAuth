import { Link } from "react-router-dom";
import { useUser } from "../store/useUser";

const Header = () => {
  const { logoutUser } = useUser();
  return (
    <div className="bg-gray-100 h-12 border-b border-b-gray-200 shadow-sm grid grid-cols-[auto_1fr] px-10 gap-3 place-content-center">
      <h1>LoGo</h1>
      <div className="grid grid-cols-[1fr_auto] gap-3 place-content-center">
        <ul className="flex justify-center items-center gap-3">
          <li>
            <Link to="/">
              <span className="text-blue-400 font-semibold text-lg">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span className="text-blue-400 font-semibold text-lg">About</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <span className="text-blue-400 font-semibold text-lg">
                Contact
              </span>
            </Link>
          </li>
        </ul>
        <button
          onClick={logoutUser}
          className="text-gray-900 font-semibold text-xs bg-gray-200 hover:bg-gray-300 px-3 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
