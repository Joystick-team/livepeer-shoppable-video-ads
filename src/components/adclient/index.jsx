import { useState,useEffect,useRef } from 'react'
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { getSrc, } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
import {
  useMediaContext,
  useStore,
} from "@livepeer/react/player";
import { useAdClient } from '../../hooks/useAd';
import { ClipLoader } from 'react-spinners';




export default function AdClient() {
        const [tag, setTag] = useState("");
        const [canPlay,setCanPlay]=useState(false)
        const {
            videoRef,
            adPlaybackRef,
            adsLoaded,
            adsCompleted,
            initializeIMA,
            loadAds
        } = useAdClient(tag);
    
        const handleVideoPlay = () => {
            if (!tag) {
                alert("Enter ad tag");
                return;
            }
            loadAds();
        };      
     return (
        <div className='w-full h-full flex flex-col py-4 px-10 space-y-10 '>
                <h5 className='text-2xl font-semibold text-white'>CLIENT SIDE ADS </h5>

                <div className='flex flex-col w-1/2 space-y-4'>
                    <input 
                    className='border py-2 px-3'
                    placeholder='Enter ad tag url'
                    onChange={(e)=>setTag(e.target.value)}
                    value={tag}
                    />
                    <button className='bg-green-500 py-2 font-semibold' onClick={initializeIMA}>RUN ADS </button>
                    
                </div>

                <Player.Root 
                     src={getSrc("https://storage.googleapis.com/interactive-media-ads/media/android.webm")}  
                     autoPlay>
                      <Player.Container className="h-1/2 w-1/2 overflow-hidden bg-gray-950 relative ">
                             <Player.Video title="Live stream" className="h-full w-full" ref={videoRef}   />
                                     <CurrentSource
                                        style={{
                                          position: "absolute",
                                          left: 20,
                                          bottom: 20,
                                        }}
                                         setCanPlay={setCanPlay}
                                      />

                                  <Player.Controls className="flex items-center justify-center">

                                         <Player.PlayPauseTrigger className="w-10 h-10 hover:scale-105 flex-shrink-0"
                                          // ref={playRef}
                                      
                                             >

                                                <Player.PlayingIndicator asChild matcher={false}>
                                                  <PlayIcon className="w-full h-full text-white" />
                                                </Player.PlayingIndicator>

                                                <Player.PlayingIndicator asChild>
                                                  <PauseIcon className="w-full h-full text-white" />
                                                </Player.PlayingIndicator>

 
                                           </Player.PlayPauseTrigger>

                                     </Player.Controls>
                                           <Player.LoadingIndicator
                                                className='flex w-full h-full justify-center items-center bg-black text-white font-semibold'
                                         
                                              >
                                             <ClipLoader 
                                                  color='green'
                                                  size={100}
                                             />
                                     </Player.LoadingIndicator>
                                      <Player.ErrorIndicator
                                        matcher="all"
                                        className='flex w-full h-full justify-center items-center bg-black text-white font-semibold'
                                      >
                                        An error occurred. Trying to resume playback...
                                      </Player.ErrorIndicator>

                                    <div id="ad-container" ref={adPlaybackRef}  className={`absolute top-0 ${adsCompleted&&"hidden"} ` }></div>
                                      {canPlay&&adsLoaded&&
                                          <div className='absolute top-0 flex items-center justify-center w-full h-full '>
                                              <PlayIcon className="w-10 h-10 text-white" onClick={handleVideoPlay}/>
                                      
                                              </div>
                                       }
                            </Player.Container>

                      </Player.Root>
                  
                  </div>
                )
}



function CurrentSource({
        style,
        __scopeMedia,
        setCanPlay
}) {
  const context = useMediaContext("CurrentSource", __scopeMedia);

  const { currentSource } = useStore(context.store, ({ currentSource }) => ({
    currentSource,
  }));

  useEffect(()=>{
    setCanPlay(context.store.getState()?.canPlay)
  },[context.store.getState()?.canPlay])
  return currentSource ? (
    <div style={style}>
      <span>
        Playback type:{" "}
        <span
          style={{
            color: "#ffffffe2",
          }}
        >
          {/* {currentSource?.type} */}
        </span>
      </span>
    </div>
  ) : null;
}



