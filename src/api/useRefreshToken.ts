import axios from "axios";
import { refrishApi } from "./apiConstants";
import { useUser } from "../store/useUser";

export const useRefreshToken = () => {
  const { refreshToken: token } = useUser();

   return async function refreshToken() {
    return await axios.post(refrishApi, { refreshToken: token || "" });
  };
};
