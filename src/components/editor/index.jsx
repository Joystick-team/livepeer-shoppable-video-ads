import React,{useState,useRef} from 'react'
import HotspotStudio from './m'
import Tags from './tags'
import { IoMdAdd } from "react-icons/io";
import { HiFolderAdd } from "react-icons/hi";
import { CgFolderAdd } from "react-icons/cg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useShoppableVideo } from '../../hooks/useShoppable';
import Preview from './preview';

export default function Editor() {
      const [file,setFile]=useState(null)
      const [isSave,setSave]=useState(false)
      const {
        videoRef,
        shoppableVideoRef,
        product,
        products,
        sliderTime,
        activeProduct,
        currentTime,
        setProduct,
        handleVideoClick,
        handleSliderChange,
        handleAddProduct,
        handleHotspotClick,
        setCurrentTime
      } = useShoppableVideo(isSave);
      
  return (
    <div className='w-full h-full text-white'>
        {isSave?

           <Preview
                file={file}
                setSave={setSave}
                currentTime={ currentTime}
                products={products}
                handleHotspotClick={ handleHotspotClick}
                shoppableVideoRef={shoppableVideoRef}
                activeProduct={ activeProduct} 
                setCurrentTime={setCurrentTime}    
            />
                :       
         <div className='w-full h-full flex'>
                <div className='flex w-4/5'>
                    <SidePanel 
                        setFile={setFile}
                    />
                    <HotspotStudio 
                        file={file}
                        setFile={setFile}
                        videoRef={videoRef}
                        product={product}
                        setProduct={setProduct}
                        handleAddProduct={handleAddProduct}
                        handleVideoClick={handleVideoClick}
                        setSave={setSave}

                        />
                </div>
                <div className='w-2/5 py-4'>
                    <Tags
                        setProduct={setProduct}
                        products={products}
                    />        
                </div>
        </div>
        }
      
 
    </div>
  )
}


const SidePanel=({setFile})=>{
    const hiddenFileInput = useRef()
     
    const handleClick = event => {
        hiddenFileInput.current.click()
     }

     const handleChange = async(e)=> {
        const dir = e.target.files[0]
        if (dir) {   
            setFile(URL.createObjectURL(dir))
        }        
      }

     return(
       <div className='w-14 flex flex-col items-center h-full border-r py-4 border-gray-700 space-y-8 '>
           
       
            <button className='bg-green-600 text-white h-10 w-10 flex items-center justify-center rounded-lg'
                onClick={handleClick}
                data-tooltip-id="my-tooltip-1"
              >
               <IoMdAdd className='text-2xl'/>
               <input
                    type="file"
                    className='hidden'
                    ref={hiddenFileInput}
                    onChange={handleChange}
                 />
            </button>

              <ReactTooltip
                    id="my-tooltip-1"
                    place="bottom"
                    content="Import a video"
                    className='text-sm'
                />         

       </div> 
     )
}