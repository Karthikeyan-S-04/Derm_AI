import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cameras({ set }) {
  const webcamRef = useRef(null);
  const [result, setResult] = useState();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    sendImageToServer(imageSrc);
  }, [webcamRef]);

  const sendImageToServer = async (imageSrc) => {
    if (imageSrc) {
      try {
        const formData = new FormData();
        formData.append("image", dataURLtoFile(imageSrc, "image.jpg"));
        const { data } = await axios.post(`http://127.0.0.1:2000/`, formData);
        toast.info("Result: " + data.predicted);
        setResult(data.predicted);  
      } catch (error) {
        console.error("Error sending image to server:", error);
      }
    }
  };

  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // const [deviceId, setDeviceId] = useState({});
  // const [devices, setDevices] = useState([]);

  // const handleDevices = useCallback(
  //   (mediaDevices) =>
  //     setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
  //   [setDevices]
  // );

  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then(handleDevices);
  // }, [handleDevices]);

  return (
    <div className="flex justify-center flex-col">
      <div className="border-8 rounded-xl">
        {/* {devices.map((device, key) => (
          <div>
            <Webcam
              audio={false}
              videoConstraints={{ deviceId: device.deviceId }}
            />
            {device.label || `Device ${key + 1}`}
          </div>
        ))} */}
        <Webcam
          className=" bg-slate-500"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <button
        className="h-12 my-7 rounded-xl transition ease-in-out delay-150 bg-blue-900 text-[#fff] hover:-translate-y-1 hover:scale-110 hover:bg-[#1e263a]"
        onClick={capture}
      >
        Take photo
      </button>
      <button
        className="h-12 rounded-xl transition ease-in-out delay-150 bg-blue-900 text-[#fff] hover:-translate-y-1 hover:scale-110 hover:bg-[#1e263a]"
        onClick={(e) => set(true)}
      >
        upload photo
      </button>
      <div className="border-2 rounded-xl border-blue-900 mt-4 border-dashed p-5">
        Result: {result ? <span className=" text-lime-900 font-bold">{result}</span>:<span>Check yourself</span>}
      </div>
    </div>
  );
}

export default Cameras;
