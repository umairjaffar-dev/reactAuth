import { create } from "zustand";
import { userLoginType } from "../api/apiResponseTypes/userLogin.types";

type UserActionType = {
  setUser: (user: userLoginType) => void;
  logoutUser: () => void;
};
const initialUserState = {
  accessToken: localStorage.getItem("accessToken") || "",
  profileId: 0,
  profilePic: null,
  refreshToken: "",
  userEmail: "",
  userName: "",
  userType: "",
  uuid: 0,
};

export const useUser = create<userLoginType & UserActionType>((set) => ({
  ...initialUserState,

  setUser(user) {
    set(user);
  },

  logoutUser() {
    console.log("logout");
    localStorage.removeItem("accessToken");
    set((state) => ({
      ...state,
      accessToken: "",
      profileId: 0,
      profilePic: null,
      refreshToken: "",
      userEmail: "",
      userName: "",
      userType: "",
      uuid: 0,
    }));
  },

}));
