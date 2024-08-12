import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../store/useUser";
import Header from "./Header";

const AuthWrapper = () => {
  // const [token, setToken] = useState("");
  const { accessToken } = useUser();

  // useEffect(() => {
  //   setToken(accessToken);
  // }, [accessToken]);

  // console.log('token', token);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthWrapper;
