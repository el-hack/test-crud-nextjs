import { UserType } from "@/services/users/types/response.type";
import { create } from "zustand";

type CustomerStoreType = {
    customers: UserType[];
    token: any;
    setToken: (token: any) => void;
    initCusomer: (customers: UserType[]) => void;
    addCustomer: (customer: UserType) => void;
    removeCustomer: (id: number) => void;
}

export const customerStore = create<CustomerStoreType>((set) => ({
    customers: [],
    token: null,
    setToken: (token: any) => set({ token }),
    initCusomer: (customers: UserType[]) => set({ customers: customers }),
    addCustomer: (customer: UserType) => set((state) => ({ customers: [...state.customers, customer] })),
    removeCustomer: (id: number) => set((state) => {
        return {
            customers: state.customers.filter((customer) => customer.id !== id)
        }
    }),
}));    
