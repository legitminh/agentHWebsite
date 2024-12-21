'use client'
import RecordingView from "./components/RecordingView";
// import { RecordingProvider } from "./components/Atoms";
import RecoilRootWrap from "./components/RecoilRootWrap";
import ThemeWrapper from "./components/ThemeWrapper";
import ToggleTheme from "./components/ToggleTheme";
export default function Home() {
  return (
    <ThemeWrapper>
    <div className="flex min-h-screen flex-col items-center bg-transparent">
      <RecordingView/>

    </div>
    <div  className = "absolute top-10 left-10">
      <ToggleTheme></ToggleTheme>

    </div>
    </ThemeWrapper>
    
  );
}
