import React,{useState,useRef} from 'react'
import { useShoppableVideo } from '../../hooks/useShoppable'
import vid from "../../assets/2.mp4"

export default function HotspotStudio({
                        file, 
                        videoRef,
                        product,
                        setProduct,
                        handleAddProduct,
                        handleVideoClick,
                        setSave}){    
       return (
      <div className=' w-full flex flex-col h-full bg-black '>
           <div className='w-full bg-black h-3/5 flex justify-center py-6'>
                <div className="relative  h-96 w-1/3">
                    <video
                        src={file?file:vid}
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
                <div className='w-full h-2/5 px-2'>
                    <ProductMetaData 
                        product={product}
                        setProduct={setProduct}
                        handleAddProduct={handleAddProduct}
                        setSave={setSave}
                    />

            </div>
    </div>
  )
}


const ProductMetaData=({product,setProduct,handleAddProduct,setSave})=>{
        const hiddenFileInput = useRef()
        
        const handleClick = event => {
            hiddenFileInput.current.click()
        }


        const handleChange = async(e)=> {
            const dir = e.target.files[0]
            if (dir) {
            
                setProduct({...product,img:URL.createObjectURL(dir)})
            }
                
        }
    return(
        <div className='w-full h-[98%] rounded-sm bg-[#1b1e2a] '
         >
            <div className='border-b flex justify-end py-4'>
                  <div className='flex items-center space-x-4 px-4'>
                      <button className='text-lg border border-red-600 px-6 py-2'>Cancel</button>
                      <button className='bg-green-600 px-6 py-2'
                        onClick={()=>setSave(true)}
                      >
                        Preview
                     </button>
                  </div>

             </div>

            <div className='flex flex-col px-4'>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4  py-4 ">
                            {[
                                {
                                label: "PRODUCT NAME",
                                change: (e) => setProduct({ ...product, title: e.target.value }),
                                val: product?.title,
                                },
                                {
                                label: " URL",
                                change: (e) => setProduct({ ...product, link: e.target.value }),
                                val: product?.link,
                                },
                                {
                                label: "DESCRIPTION",
                                change: (e) => setProduct({ ...product, desc: e.target.value }),
                                val: product?.desc,
                                },
                                {
                                label: "PRICE USD",
                                change: (e) => setProduct({ ...product, price: e.target.value }),
                                val: product?.price,
                                },
                            ]?.map((item) => {
                                return (
                                <div className="flex flex-col space-y-1" key={item?.label}>
                                    <label className="font-semibold">{item?.label}</label>
                                    <input
                                    className="border px-4 bg-black text-white outline-green-600 py-2"
                                    value={item?.val}
                                    onChange={item?.change}
                                    />
                                </div>
                                );
                            })}
                    </div>

                    <div className='flex justify-end space-x-4 items-center'>
                        {product?.img?
                           <p>{"Image Uploaded"}</p>
                           :                 
                        <button className='border  bg-blue-600 px-6 py-2' 
                            onClick={handleClick}
                         >
                            UPLOAD THUMBNAIL
                        </button>
                         }
                        <button className='border border-green-600 px-6 py-2' 
                          onClick={()=>handleAddProduct()}>
                            ADD PRODUCT
                        </button>
                         <input
                            type="file"
                            className='hidden'
                            ref={hiddenFileInput}
                            onChange={handleChange}
                         />
                    </div>

             </div>

        </div>
    )
}