import create from 'zustand';

type State = {
    user: boolean;
    setUser: (newUser: boolean) => void;
};

export const useUserStore = create<State>((set) => ({
    user: false,
    setUser: (newUser: boolean) => set({ user: newUser }),
}));