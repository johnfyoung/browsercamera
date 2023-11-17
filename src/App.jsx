import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoStream from "./VideoStream";

function App() {
  // const [mediaStream, setMediaStream] = useState(null);
  // const [blocked, setBlocked] = useState(false);

  // const startCamera = async () => {
  //   try {
  //     const result = await navigator.mediaDevices.getUserMedia({ video: true });
  //     console.log(result);
  //     setMediaStream(result);
  //   } catch (e) {
  //     setBlocked(true);
  //     console.log(`Blocked! ${e}`);
  //   }
  // };
  const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
    },
  };

  return (
    <>
      <h1>Browser Camera</h1>
      <div className="card">
        {"mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices ? (
          <>
            <VideoStream constraints={constraints} />
          </>
        ) : (
          <p>
            Your browser doesn't support camera access or you have blocked
            access
          </p>
        )}
      </div>
    </>
  );
}

export default App;
