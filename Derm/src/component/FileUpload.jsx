import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = ({ set }) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [result, setResult] = useState();

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const sendImageToServer = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post(`http://127.0.0.1:2000`, formData);
        toast.info("Result: " + data.predicted);
        setResult(data.predicted);
      } catch (error) {
        console.error("Error sending image to server:", error);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col w-1/2">
      <div className="border-8 rounded-xl border-blue-900">
        <div className="flex items-center justify-center w-full">
          {preview ? <img src={preview} className=" w-2/4 h-2/4" alt="upload image" /> : <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-blue-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-blue-900">
                <div><span className="font-semibold">Click to upload</span> or drag and drop</div>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </label>}
        </div>
      </div>
      <button
        className="h-12 my-7 rounded-xl transition ease-in-out delay-150 bg-blue-900 text-[#fff] hover:-translate-y-1 hover:scale-110 hover:bg-[#1e263a]"
        type="submit"
        onClick={(e) => sendImageToServer(e)}
      >
        Upload
      </button>
      <button
        className="h-12 rounded-xl transition ease-in-out delay-150 bg-blue-900 text-[#fff] hover:-translate-y-1 hover:scale-110 hover:bg-[#1e263a]"
        onClick={(e) => set(false)}
      >
        Take Picture
      </button>
      <div className="border-2 rounded-xl border-blue-900 mt-4 border-dashed p-5">
        Result: {result ? <span className=" text-lime-900 font-bold">{result}</span>:<span>Check yourself</span>}
      </div>
    </div>
  );
};

export default FileUpload;
