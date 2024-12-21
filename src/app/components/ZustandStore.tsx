import {create } from 'zustand'
interface GenerationState {
    theme: string;
    audioURL: string; 
    setTheme: (theme: string) => void;
    setAudioURL: (audioURL: string) => void; 
}
export const useGenerationStore = create<GenerationState>()((set) => ({
    theme: "dark",
    audioURL: "",
    setTheme: (theme: string) => set({theme}),
    setAudioURL: (audioURL: string) => set({ audioURL })
}))