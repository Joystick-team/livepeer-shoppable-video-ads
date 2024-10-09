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

            <div className='w-full flex flex-col items-center space-y-4'>
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
                                Math.abs(spot.time - currentTime) < 0.8
                            )
                            .map((spot, index) => (
                                <div
                                key={`${prodIndex}-${index}`}
                                className='hotspot cursor-pointer hover:bg-green-700'
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
                      <Product
                        item={activeProduct} 
                      />
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

const Product = ({ item }) => {
    return (
        <div className='absolute top-[10%] right-[23%] flex flex-col border shadow-lg px-4 py-2 bg-white w-[250px] z-50 space-y-3'>
            <div className='flex justify-between w-full text-black items-center'>
                    <div className='flex space-x-4'>
                        <img src={item?.img} className="h-12 w-12 rounded-sm" />
                        <div className='flex flex-col'>
                            <p>{item?.title}</p>
                            <p className='text-xs'>{item?.desc?.slice(0,50)}...</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p>${item?.price}</p>
                    </div>       
            </div>
               
                    
                    <button className=' font-semibold text-white hover:text-blue-800  bg-green-500 px-6 py-2'>
                       <a href={item?.link}>
                         Shop now
                        </a>
                    </button>
               
        </div>
    );
};
