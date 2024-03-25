// dataStore.ts
import create from 'zustand';

// Define types for the state
interface DataState {
    datavalue: number[];
    dataname: string[];
    isLoading: boolean;
    setDataValue: (newValue: number[]) => void;
    setDataName: (newName: string[]) => void;
    setIsLoading: (isLoading: boolean) => void;
}

// Create and export the store
const useDataStore = create<DataState>((set) => ({
    datavalue: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    dataname: ['Electrical', 'Mechanical', 'Civil', 'Production', 'Computer', 'IT', 'Textile', 'Electro', 'EXTC'],
    isLoading: false,
    setDataValue: (newValue) => set({ datavalue: newValue }),
    setDataName: (newName) => set({ dataname: newName }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useDataStore;
