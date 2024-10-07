import './App.css';
import vid from "./assets/2.mp4";
import { useRef, useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";

export default function Studio() {
  const videoRef = useRef();
  const shoppableVideoRef = useRef();
  const [product, setProduct] = useState({ title: "", hotspots: [] });
  const [products, setProducts] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clickTime, setClickTime] = useState(0); // Store time when clicked
  const [sliderTime, setSliderTime] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // Current time of preview player

  const handleVideoClick = (event) => {
    const videoElement = videoRef.current;
    const rect = videoElement.getBoundingClientRect();
    const x = event.clientX - rect.left; // X coordinate relative to the video
    const y = event.clientY - rect.top; // Y coordinate relative to the video
    const time = videoElement.currentTime; // Get the current time of the video

    // Store the click position and time in the product's hotspot array
    setProduct((prevProduct) => ({
      ...prevProduct,
      hotspots: [
        ...prevProduct.hotspots,
        { x: (x / rect.width) * 100, y: (y / rect.height) * 100, time },
      ],
    }));

    setClickTime(time);
    videoElement.pause(); // Pause after clicking to add hotspots
  };

  const handleSliderChange = (event) => {
    const time = event.target.value; // Get the slider value (time in seconds)
    setSliderTime(time); // Update slider state
    videoRef.current.currentTime = time; // Set video time to slider value
  };

  const handleAddProduct = () => {
    if (product.title) {
      setProducts((prevProducts) => [...prevProducts, product]);
      setProduct({ title: "", hotspots: [] }); // Reset product after adding
    }
  };

  const handleHotspotClick = (product) => {
    setActiveProduct(product); // Set active product when a hotspot is clicked
  };

  useEffect(() => {
    const shoppableVideo = shoppableVideoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(shoppableVideo.currentTime); // Update current time of the preview video
    };

    shoppableVideo.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      shoppableVideo.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="w-full py-10 relative flex px-10 ">
      <div className="w-1/2 flex flex-col items-center space-y-2">
        <h5 className="font-semibold">Studio Hotspots</h5>
        <div className="flex-reverse space-y-4 w-full">
          <div className="flex w-full flex-col space-y-8">
            <div className="flex w-full">
              {products?.length > 0 && (
                <div className="flex space-x-4  w-full">
                  {products?.map((prod) => {
                    return (
                      <div className="flex bg-gray-400 shadow-lg w-1/2 p-6 space-x-4">
                        <h5>{prod?.title}</h5>
                        <h5>${prod?.price}</h5>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="relative  h-96 w-1/2">
              <video
                src={vid}
                ref={videoRef}
                className="w-full object-cover h-96  relative"
                controls
                autoPlay
                muted
                onClick={handleVideoClick}
              />
              {product.hotspots.map((spot, index) => (
                <div
                  key={index}
                  className="absolute bg-red-500 rounded-full"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    width: "20px",
                    height: "20px",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col ">
            <input
              type="range"
              min="0"
              max={videoRef.current ? videoRef.current.duration : 100} // Max is the video duration
              value={sliderTime}
              onChange={handleSliderChange}
              className="w-1/2 mt-4"
            />
            <h5 className="items-center flex space-x-1" onClick={handleAddProduct}>
              <IoMdAddCircle className="text-4xl text-gray-500" />
              <span> Product</span>
            </h5>
            <div className="flex flex-col w-1/2 py-4 space-y-3">
              {[
                {
                  label: "Product Title",
                  change: (e) => setProduct({ ...product, title: e.target.value }),
                  val: product?.title,
                },
                {
                  label: "Product Link",
                  change: (e) => setProduct({ ...product, link: e.target.value }),
                  val: product?.link,
                },
                {
                  label: "Product Description",
                  change: (e) => setProduct({ ...product, desc: e.target.value }),
                  val: product?.desc,
                },
                {
                  label: "Product Price",
                  change: (e) => setProduct({ ...product, price: e.target.value }),
                  val: product?.price,
                },
              ]?.map((item) => {
                return (
                  <div className="flex flex-col space-y-1" key={item?.label}>
                    <label className="font-semibold">{item?.label}</label>
                    <input
                      className="border px-4 py-2"
                      value={item?.val}
                      onChange={item?.change}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center">
        <h5> Shoppable video</h5>
        

        <div className="relative h-96 w-1/2">
          <video
            src={vid}
            ref={shoppableVideoRef}
            className="w-full object-cover h-96  relative"
            controls
            muted
          />
          {products.map((prod, prodIndex) =>
            prod.hotspots
              .filter(
                (spot) =>
                  Math.abs(spot.time - currentTime) < 1 // Only show hotspot when the time is within a 1-second window
              )
              .map((spot, index) => (
                <div
                  key={`${prodIndex}-${index}`}
                  className="absolute bg-blue-500 rounded-full cursor-pointer"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    width: "20px",
                    height: "20px",
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => handleHotspotClick(prod)}
                ></div>
              ))
          )}
        </div>

        {activeProduct && (
          <div className="mt-4 p-4 bg-gray-200">
            <h5>Product: {activeProduct.title}</h5>
            <p>Price: {activeProduct.price}</p>
            <p>{activeProduct.desc}</p>
            <a href={activeProduct.link} target="_blank" rel="noopener noreferrer">
              View Product
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
