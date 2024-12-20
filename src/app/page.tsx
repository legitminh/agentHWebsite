import RecordingView from "./components/RecordingView";
// import { RecordingProvider } from "./components/Atoms";
import RecoilRootWrap from "./components/RecoilRootWrap";
import ThemeWrapper from "./components/ThemeWrapper";
export default function Home() {
  return (
    // <RecordingProvider>
    <RecoilRootWrap>
    {/* <ThemeWrapper> */}

      <div className="flex min-h-screen flex-col items-center bg-gray-100">
        <RecordingView/>

      </div>
      {/* </ThemeWrapper> */}
    </RecoilRootWrap>
    // </RecordingProvider>
  );
}
