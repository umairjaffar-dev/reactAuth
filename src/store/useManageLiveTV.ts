import { create } from "zustand";
import { LiveTvState } from "./useManageLiveTV.types";

const useManageLiveTV = create<LiveTvState>((set, get) => ({
    selectedChannels:[]
}));
