import { useEffect } from "react";
import { useUser } from "../store/useUser";
import { useRefreshToken } from "./useRefreshToken";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { axiosPrivate } from "./apiConstants";

export const useAxiosPrivate = () => {
  const { accessToken, updateAccessToken } = useUser();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const retriedRequests = new Set<string>();
    // Add Access Token to the header of each api request.
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(new Error(error.message));
      }
    );

    /**
     * Get response of api if successfull.
     * Check error if response is not successfull. if response status code is 401 then
     * our token is expire we need to refresh the token. and if status code is 402 then both
     * tokens are expire then navigate to login page.
     */
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: unknown) => {
        if (axios.isAxiosError<{ message: string }>(error)) {
          const axiosError = error;
          const responseStatus = axiosError.response?.status;
          const orignalRequest = axiosError.config;
          const alreadyRetried = retriedRequests.has(orignalRequest?.url ?? "");
          /** if access token is expired then refresh the access token and retry orignal request */
          if (
            orignalRequest &&
            responseStatus === 401 &&
            // !originalRequest._retry &&
            !alreadyRetried
          ) {
            // originalRequest._retry = true;
            retriedRequests.add(orignalRequest.url ?? "");
            try {
              const res = await refresh();
              const newAccessToken = res.data.accessToken;
              updateAccessToken(newAccessToken);

              orignalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosPrivate(orignalRequest);
            } catch (retriedReqError) {
              if (axios.isAxiosError(retriedReqError)) {
                return Promise.reject(retriedReqError);
              }

              return Promise.reject(
                new Error(
                  "This must be an axios error. please check if something is wrong"
                )
              );
            }
          }
          //if refresh token is expired
          if (responseStatus === 403) {
            navigate("/login", {
              state: {
                from: location.pathname + location.search,
              },
            });
          } else {
            console.log("in else ", axiosError);
            return Promise.reject(axiosError);
          }
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [
    accessToken,
    refresh,
    updateAccessToken,
    location.pathname,
    location.search,
    navigate,
  ]);

  return axiosPrivate;
};
