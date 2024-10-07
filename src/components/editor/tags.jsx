import React from 'react'
import { useShoppableVideo } from '../../hooks/useShoppable';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
export default function Tags({ products,setProduct}) {

   console.log(products,"ppp")
  return (
     <div className='flex flex-col px-4 py'>
           <div className='flex flex-col space-y-4'>
                <p className='font-semibold'>YOUR PRODUCT TAGS</p>
                {products?.map((item)=>{
                   return(
                     <Product 
                        item={item}
                     />
                   )
                })

                }
             
           </div>

     </div>
  )
}


const Product=({item})=>{
   return(
      <div className='flex items-center justify-between border shadow-lg px-4 py-2 '>
            <div className='flex space-x-4'>
                  <img 
                    src={item?.img}
                    className="h-10 w-10 rounded-sm"
                  />
                 <div className='flex flex-col'>
                     <p>{item?.title}</p>
                     <p className='text-xs'>{item?.desc?.slice(0,100)}</p>   
                 </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center items-center space-x-4' >
                    <p>${item?.price}</p>
                    <MdDelete
                      className='text-3xl text-red-500' 
                    />
               </div>
               
               <a href={item?.link}>
                   <p className='text-xs text-blue-600'>View product</p>
                </a>
            </div>
      </div>
   )
}