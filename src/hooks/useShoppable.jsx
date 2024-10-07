import { useState, useRef, useEffect } from "react";

export const useShoppableVideo = (isSave) => {
  const videoRef = useRef();
  const shoppableVideoRef = useRef(null);
  const [product, setProduct] = useState({ title: "",url:'',desc:'' ,price:'',hotspots: [] });
  const [products, setProducts] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clickTime, setClickTime] = useState(0);
  const [sliderTime, setSliderTime] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoClick = (event) => {
    const videoElement = videoRef.current;
    const rect = videoElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const time = videoElement.currentTime;

    setProduct((prevProduct) => ({
      ...prevProduct,
      hotspots: [
        ...prevProduct.hotspots,
        { x: (x / rect.width) * 100, y: (y / rect.height) * 100, time },
      ],
    }));

    setClickTime(time);
    // videoElement.pause();
  };

  const handleSliderChange = (event) => {
    const time = event.target.value;
    setSliderTime(time);
    videoRef.current.currentTime = time;
  };

  const handleAddProduct = () => {
    if (product.title) {
      setProducts((prevProducts) => [...prevProducts, product]);
      setProduct({ title: "", hotspots: [] });
    }
  };

  const handleHotspotClick = (product) => {
    setActiveProduct(product);
  };

  return {
    videoRef,
    shoppableVideoRef,
    product,
    products,
    clickPosition,
    sliderTime,
    activeProduct,
    currentTime,
    setProduct,
    handleVideoClick,
    handleSliderChange,
    handleAddProduct,
    handleHotspotClick,
    setCurrentTime
  };
};
