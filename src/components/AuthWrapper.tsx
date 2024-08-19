import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../store/useUser";
import Header from "./Header";
import { useRefreshToken } from "../api/useRefreshToken";
import { useEffect, useState } from "react";
import { browserStorageKeys } from "../utils/constants";

const AuthWrapper = () => {
  const { userName, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken =
    localStorage.getItem(browserStorageKeys.refreshToken) ?? "";
  const refresh = useRefreshToken();
  
  async function refreshUser() {
    if ((refreshToken && userName) || !refreshToken) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await refresh();
      setUser(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  // In effect we refresh the user.
  useEffect(() => {
    refreshUser();
  }, [refreshToken, userName, setUser, refresh]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">Loading</div>
    );
  }

  // console.log("userName", userName);

  if (!userName) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthWrapper;
