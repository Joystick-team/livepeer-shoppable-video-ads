import React from 'react'
import logo from "./assets/logo-full.png"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center py-6 font-mono text-white space-y-4'>
          <img 
            src={logo}
          />
          <div className='flex flex-col items-center space-y-2'>
              <h5 className='text-2xl'>Demos</h5>
              <Link to="/~editor">
                   <h5 className='hover:text-green-400 hover:underline'>Shoppable video ~ Studio </h5>
              </Link>
              <Link to="~ads">         
                    <h5 className='hover:text-green-400 hover:underline'>Client side Ads ~ IMA </h5>
              </Link>
       

          </div>

    </div>
  )
}
