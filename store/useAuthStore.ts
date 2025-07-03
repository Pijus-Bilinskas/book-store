
import { account } from "@/lib/appwrite";
import { create } from "zustand";

type User = {
    name: string;
    email: string;
    $id: string;
} | null;

type AuthStore = {
    user: User;
    loading: boolean;
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    fetchUser: () => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: true,
    isLoginOpen: false,
    openLogin: () => set({ isLoginOpen: true }),
    closeLogin: () => set({ isLoginOpen: false }),

    fetchUser: async () => {
        try{
            const current = await account.get();
            set({ user: current, loading: false });
        } catch (error) {
            console.error("failed to fetch user", error)
            set({ user: null, loading: false })
        }
    },

    setUser: (user) => set({ user }),

    logout: async () => {
        await account.deleteSession('current');
        set({ user: null })
    },
}))