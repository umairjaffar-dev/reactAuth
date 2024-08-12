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

  useEffect(() => {
    async function refreshUser() {
      if ((refreshToken && userName) || !refreshToken) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await refresh();
        setUser(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    refreshUser().catch((error: unknown) => {
      console.log(error);
    });
  }, [refreshToken, userName, setUser, refresh]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center"> Loading</div>
    );
  }

  if (!userName) {
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
