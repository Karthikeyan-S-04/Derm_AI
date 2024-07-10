import { useState } from "react";
import Cameras from "./component/Cameras";
import FileUpload from "./component/FileUpload";

function App() {

  const [enable,setEnable] = useState(true);
  console.log(enable);  

  return (
    <>
      <div className="flex justify-center p-10 bg-[linear-gradient(118deg,_rgba(255,255,255,1)_0%,_rgba(209,221,235,1)_57%,_rgba(122,215,233,1)_100%)] h-screen">
        {enable ? <FileUpload set={setEnable} /> : <Cameras set={setEnable}/>}
        {/* <Cameras/> */}
      </div>
    </>
  );
}

export default App;
