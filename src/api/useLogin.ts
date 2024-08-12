import axios from "axios";
import { useMutation } from "react-query";
import { loginApi } from "./apiConstants";
import { userLoginType } from "./apiResponseTypes/userLogin.types";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      persistLogin: boolean;
      portal: string;
    }) => {
      const response = await axios.post<userLoginType>(loginApi, data, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
  });
};
