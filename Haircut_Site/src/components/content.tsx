import React from 'react'
import Card from './items'
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';



interface ContentProps {
  title: string;
  img_files: string[];
  img_labels: string[];
  price: number[];
  setCartItems: (item: { item: string; quantity: number; price: number }) => void;
}


const Content = (props: ContentProps) => {
const {title , img_files, img_labels, setCartItems,price} = props
const [count, setCount] = useState(0)
const size = img_labels.length


const onclickhandlerforward  = (event:any) => (

  setCount((prevCount) => (prevCount + 1))

)
const onclickhandlerbackward  = (event:any) => (

  setCount((prevCount) => (prevCount - 1))

)


  
  return (
    <div className='flex flex-col items-center justify-between'>
    <h1 className='text-4xl font-bold mb-2'>{title}</h1>
    <div className="flex flex-row">
    <div className = "flex flex-col items-center justify-center">  
    <button onClick={onclickhandlerbackward} disabled = {!(count > 0)} >
    <IoIosArrowBack size = "5em" />
    </button >
    </div>
      {

        img_labels.map((item: string,index: number) =>
        ((index >= count && index < count + 4)? <Card imgsrc = {img_files[index]} label= {item} price = {price[index]} setCartItems={setCartItems} /> : <></> )
      )

        
      }
 
    <div className = "flex flex-col items-center justify-center">  
    <button onClick={onclickhandlerforward} disabled = {!(count + 4 < size)} >
    <IoIosArrowForward size = "5em" />
    </button >
    </div>
    </div>

    </div>
  )
}

export default Content