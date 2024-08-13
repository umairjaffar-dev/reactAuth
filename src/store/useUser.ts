import { create } from "zustand";
import { userLoginType } from "../api/apiResponseTypes/userLogin.types";
import { browserStorageKeys } from "../utils/constants";

type UserActionType = {
  setUser: (user: userLoginType) => void;
  updateAccessToken: (accessToken: string) => void;
  logoutUser: () => void;
};
const initialUserState = {
  accessToken: "",
  profileId: 0,
  profilePic: null,
  refreshToken: localStorage.getItem(browserStorageKeys.refreshToken) || "",
  userEmail: "",
  userName: "",
  userType: "",
  uuid: 0,
};

export const useUser = create<userLoginType & UserActionType>((set) => ({
  ...initialUserState,

  setUser(user) {
    set({...user});
  },

  updateAccessToken(accessToken) {
    set({ accessToken });
  },

  logoutUser() {
    console.log("logout");
    localStorage.removeItem(browserStorageKeys.refreshToken);
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
