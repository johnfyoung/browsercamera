import { useEffect, useState, useRef } from "react";
import { PlayCircle, Pause, Image } from "feather-icons-react";

function VideoStream({ constraints }) {
  let videoRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [device, setDevice] = useState(null);
  const [error, setError] = useState("");
  const [stream, setStream] = useState(null);
  const [streamStarted, setStreamStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("devices", devices);
      setVideoDevices(
        devices.filter((deviceItem) => deviceItem.kind === "videoinput")
      );
    };

    getDevices().catch((e) => setError(`something went wrong: ${e}`));
  }, [stream]);

  useEffect(() => {
    const getStream = async () => {
      setStream(await navigator.mediaDevices.getUserMedia(constraints));
    };
    if (!stream) {
      getStream().catch((e) => {
        setError(`something went wrong: ${e}`);
      });
    }
  }, []);

  const handlePlay = () => {
    if (streamStarted) {
      videoRef.current.play();
      setIsPlaying(true);
      return;
    }

    if (device) {
      const updatedConstraints = {
        ...constraints,
        deviceId: {
          exact: device,
        },
      };
      startStream(updatedConstraints);
    }
  };

  const startStream = async (constraints) => {
    if (stream) {
      handleStream();
    } else {
      console.log("no stream");
    }
  };

  const handleStream = () => {
    videoRef.current.srcObject = stream;

    setStreamStarted(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleSelectDevice = function (e) {
    if (e.target.value) {
      setDevice(e.target.value);
    } else {
      setDevice(null);
    }
  };

  const styles = {
    playButton: {
      display: isPlaying ? "none" : "inline",
    },
    pauseButton: {
      display: isPlaying ? "inline" : "none",
    },
  };

  return (
    <>
      {error && <div>{error}</div>}
      <div>
        <video ref={videoRef} autoPlay></video>
        <canvas className="d-none"></canvas>

        <div className="video-options">
          <select
            name=""
            id=""
            className="custom-select"
            onChange={handleSelectDevice}
          >
            {console.log("video devices", videoDevices)}
            <option value="">Select camera</option>
            {videoDevices.map((deviceItem) => (
              <option key={deviceItem.deviceId} value={deviceItem.deviceId}>
                {deviceItem.label}
              </option>
            ))}
          </select>
        </div>

        {isPlaying && <img className="screenshot-image d-none" alt="" />}

        <div className="controls">
          <button
            className="btn btn-danger play"
            title="Play"
            onClick={handlePlay}
            style={styles.playButton}
          >
            <PlayCircle />
          </button>
          <button
            className="btn btn-info pause d-none"
            title="Pause"
            style={styles.pauseButton}
            onClick={handlePause}
          >
            <Pause />
          </button>
          <button
            className="btn btn-outline-success screenshot d-none"
            title="ScreenShot"
          >
            <Image />
          </button>
        </div>
      </div>
    </>
  );
}

export default VideoStream;
