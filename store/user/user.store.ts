import { UserType } from "@/services/users/types/response.type";
import { create } from "zustand";

type UserStoreType = {
    user: any;
    token: any;
    setToken: (token: any) => void;
    setUser: (user: UserType) => void;
}

export const userStore = create<UserStoreType>((set) => ({
    user: null,
    token: null,
    setToken: (token: any) => set({ token }),
    setUser: (user: UserType) => set({ user }),
}));    
