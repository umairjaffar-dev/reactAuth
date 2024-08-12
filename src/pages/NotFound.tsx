import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <p className="text-gray-900 text-2xl font-semibold">Page not found!</p>
      <Link to="/" className="text-blue-400">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
