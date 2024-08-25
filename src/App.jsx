import { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  ObjectDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import img from "./assets/test2.jpg";

let detector
function App() {
  const [detect, setDetect] = useState([]);

  const imageRef = useRef();

  useEffect(() => {
    const init = async () => {
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
      const detections = detector?.detect(imageRef.current);
      console.log(detections?.detections,"detetc")
      setDetect(detections?.detections || []);
    } catch (e) {
      console.log(e);
    }
  };

  const getBoundingBoxStyle = (boundingBox) => {
    if (!imageRef.current) return {};
    const originalWidth = imageRef.current.naturalWidth;
    const originalHeight = imageRef.current.naturalHeight;

    const renderedWidth = imageRef.current.width;
    const renderedHeight = imageRef.current.height;

    const xScale = renderedWidth / originalWidth;
    const yScale = renderedHeight / originalHeight;

    const x1 = boundingBox.originX * xScale;
    const y1 = boundingBox.originY * yScale;
    const width = boundingBox.width * xScale;
    const height = boundingBox.height * yScale;

    return {
      position: 'absolute',
      top: `${y1}px`,
      left: `${x1}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      pointerEvents: 'none',
    };
  };

  const getScaledAreaCoords = (boundingBox) => {
    if (!imageRef.current) return "";
    const originalWidth = imageRef.current.naturalWidth;
    const originalHeight = imageRef.current.naturalHeight;
    const renderedWidth = imageRef.current.width;
    const renderedHeight = imageRef.current.height;
    const xScale = renderedWidth / originalWidth;
    const yScale = renderedHeight / originalHeight;
    const x1 = boundingBox.originX * xScale;
    const y1 = boundingBox.originY * yScale;
    const x2 = (boundingBox.originX + boundingBox.width) * xScale;
    const y2 = (boundingBox.originY + boundingBox.height) * yScale;

    return `${x1},${y1},${x2},${y2}`;
  };

  return (
    <div className="w-full space-y-10 relative">
      <button onClick={detectImg}>go</button>

      <img
        ref={imageRef}
        src={img}
        width="480px"
        height="auto" 
        alt=""
        useMap="#example"
      />

      <map name="example">
        {detect?.map((i, index) => {
          const coords = getScaledAreaCoords(i.boundingBox);

          return (
            <area
              key={index}
              shape="rect"
              coords={coords} 
              href=""
              alt={i.categories[0]?.categoryName || "detected object"}
              onClick={() => console.log(i.categories[0]?.categoryName)}
            />
          );
        })}
      </map>
      {detect?.map((i, index) => (
        <div key={index} style={getBoundingBoxStyle(i.boundingBox)}></div>
      ))}
    </div>
  );
}

export default App;
