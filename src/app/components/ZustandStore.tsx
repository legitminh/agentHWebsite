import {create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GenerationState {
    theme: string;
    audioURL: string; 
    setTheme: (theme: string) => void;
    setAudioURL: (audioURL: string) => void; 
}
export const useGenerationStore = create<GenerationState>()(
    persist(
        (set) => ({
            theme: "dark",
            audioURL: "",
            setTheme: (theme: string) => set({ theme }),
            setAudioURL: (audioURL: string) => set({ audioURL }),
        }),
        {
            name: 'generation-store', // key used in localStorage
        }
    )
)