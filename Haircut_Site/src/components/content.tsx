import React from 'react'
import Card from './items'
import {useNavigate} from "react-router-dom"

interface ContentProps {
  title: string;
  img_files: string[];
  img_labels: string[];
  price: number[];
  setCartItems: (item: { item: string; quantity: number; price: number }) => void;
}

const Content = (props: ContentProps) => {
const {title , img_files, img_labels, setCartItems,price} = props
const navigate = useNavigate()
  
  return (
    <div className='flex flex-col items-center justify-between'>
    <h1 className='text-4xl font-bold '>{title}</h1>
    <div className="flex flex-row">
      <Card imgsrc = {img_files[0]} label = {img_labels[0]} setCartItems = {setCartItems} price = {price[0]} ></Card>
      <Card imgsrc = {img_files[1]} label = {img_labels[1]} setCartItems = {setCartItems} price = {price[1]}></Card>
      <Card imgsrc = {img_files[2]} label = {img_labels[2]} setCartItems = {setCartItems} price = {price[2]}></Card>
      <Card imgsrc = {img_files[3]} label = {img_labels[3]} setCartItems = {setCartItems} price = {price[3]} ></Card>
    </div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2 w-44" onClick={() => navigate('/checkout')}>Proceed</button>
    </div>
  )
}

export default Content