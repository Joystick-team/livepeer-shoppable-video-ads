import React,{useEffect} from 'react'
import vid from "../../assets/2.mp4"

export default function Preview({
                        file, 
                        setSave,
                        currentTime,
                        handleHotspotClick,
                        products,
                        shoppableVideoRef,
                        activeProduct,
                        setCurrentTime
                        
                      }) {
         

        useEffect(() => {
            const shoppableVideo = shoppableVideoRef.current;

            const handleTimeUpdate = () => {
               setCurrentTime(shoppableVideo.currentTime);
            };

            shoppableVideo.addEventListener("timeupdate", handleTimeUpdate);

            return () => {
             shoppableVideo.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }, []);
  return (
    <div className='flex flex-col items-center w-full h-full space-y-4 py-4'>
            <h5>Your Shoppable video</h5>
         <div className='w-4/5 flex h-full '>
              <div className='w-14 h-full'>

              </div>

            <div className='w-full flex justify-center'>
                    <div className="relative h-96 w-1/3">
                        <video
                            src={file?file:vid}
                            ref={shoppableVideoRef}
                            className="w-full object-cover h-96  relative"
                            controls
                            muted
                        />
                        {products.map((prod, prodIndex) =>
                            prod.hotspots
                            .filter(
                                (spot) =>
                                Math.abs(spot.time - currentTime) < 1
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
         <div className=' flex items-center space-x-4'>
            <button className='border  bg-blue-600 px-6 py-2' 
                onClick={()=>setSave(false)}
                >
                EDIT
            </button>
            <button className='border  bg-blue-600 px-6 py-2' 
                onClick={""}
                >
                SAVE TO IPfFS
            </button>

         </div>
    </div>
  )
}
