import { useState, useEffect, useRef } from 'react';
import './App.css';
import vid from "./assets/2.mp4"
import {
  ObjectDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import img from "./assets/test2.jpg";

let detector
function Video() {
  const [detect, setDetect] = useState([]);

  const videoRef = useRef();

  useEffect(() => {
    const init = async () => {
      console.log("init")
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const objectDetector = await ObjectDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`,
          },
          // scoreThreshold: 0.5,
          runningMode: 'IMAGE',
        });
        console.log(objectDetector,"detector")
        detector = objectDetector;
      } catch (e) {
        console.log(e);
      }
    };
    init();
  }, []);
    console.log(detector,"dette")
  const detectImg = async () => {
    try {
      const detections = detector?.detect(videoRef.current);
      console.log(detections?.detections,"detetc")
      setDetect(detections?.detections || []);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="w-full space-y-10 relative">
      <button onClick={detectImg}>go</button>

      <video 
        src={vid}
        className='bg-black h-96 w-1/2'
        ref={videoRef}
        controls
        autoPlay
       />
 
    </div>
  );
}

export default App;
